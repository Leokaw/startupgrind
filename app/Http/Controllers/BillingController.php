<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionSuccessToken;
use App\Services\StripePlanResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Checkout;

class BillingController extends Controller
{
    public function __invoke(Request $request, StripePlanResolver $resolver): Response
    {
        $user = $request->user();
        $subscription = $user->subscription('default');

        $activeSubscription = $subscription && $subscription->valid()
            ? $subscription
            : null;

        /** @var array<string, array<string, mixed>> $rawPlans */
        $rawPlans = config('subscriptions.plans', []);

        $plans = collect($rawPlans)
            ->map(fn ($plan, $slug) => array_merge($plan, [
                'slug' => $slug,
                'stripe_price_id' => $resolver->priceIdFor($slug),
            ]))
            ->values()
            ->all();

        $pendingSlug = $activeSubscription?->pending_stripe_price
            ? $resolver->planSlugFor($activeSubscription->pending_stripe_price)
            : null;
        $pendingPlan = $pendingSlug
            ? ['slug' => $pendingSlug, 'name' => config("subscriptions.plans.{$pendingSlug}.name")]
            : null;

        $trialStartedAt = $activeSubscription?->trial_started_at
            ? Carbon::parse($activeSubscription->trial_started_at)->toIso8601String()
            : null;

        // Cashier's Subscription model doesn't annotate these columns,
        // so we fetch them via getAttribute() and narrow with instanceof.
        $periodStart = $activeSubscription?->getAttribute('current_period_start');
        $periodEnd = $activeSubscription?->getAttribute('current_period_end');

        $subscriptionToken = SubscriptionSuccessToken::query()
            ->where('user_id', $user->id)
            ->whereIn('status', ['ready', 'completed'])
            ->where(fn ($q) => $q->whereNull('expires_at')->orWhere('expires_at', '>', now()))
            ->latest()
            ->first();

        return Inertia::render('billing/index', [
            'plans' => $plans,

            'currentPlan' => $resolver->planSlugFor($activeSubscription?->stripe_price),

            'subscription' => $activeSubscription ? [
                'status' => $activeSubscription->stripe_status,
                'stripe_price' => $activeSubscription->stripe_price,
                'current_period_start' => $periodStart instanceof Carbon
                    ? $periodStart->toIso8601String()
                    : null,
                'current_period_end' => $periodEnd instanceof Carbon
                    ? $periodEnd->toIso8601String()
                    : null,
                'ends_at' => $activeSubscription->ends_at?->toIso8601String(),

                'has_trial' => $activeSubscription->trial_ends_at !== null,
                'trial_started_at' => $trialStartedAt,
                'trial_ends_at' => $activeSubscription->trial_ends_at?->toIso8601String(),
                'on_trial' => $activeSubscription->onTrial(),

                'pending_plan' => $pendingPlan,

                'on_grace_period' => $activeSubscription->onGracePeriod(),
                'canceled' => $activeSubscription->canceled(),
            ] : null,

            'subscriptionToken' => $subscriptionToken ? [
                'token' => $subscriptionToken->token,
                'status' => $subscriptionToken->status,
                'plan_slug' => $subscriptionToken->plan_slug,
            ] : null,

            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
                'checkout' => $request->query('checkout'),
                'toast' => session('toast'),
            ],
        ]);
    }

    public function subscribe(Request $request, StripePlanResolver $resolver): RedirectResponse|Checkout
    {
        $request->validate([
            'plan' => ['required', 'in:pro,enterprise'],
        ]);

        $user = $request->user();
        $planSlug = $request->input('plan');
        $plan = config("subscriptions.plans.{$planSlug}");
        $priceId = $resolver->priceIdFor($planSlug);

        abort_if(
            $priceId === null,
            500,
            "Stripe price not configured for plan [{$planSlug}].",
        );

        $subscription = $user->subscription('default');

        if ($subscription && $subscription->valid()) {
            if ($subscription->stripe_price === $priceId) {
                return back()->with('toast', [
                    'type' => 'info',
                    'message' => "You're already on {$plan['name']}.",
                ]);
            }

            $subscription->update(['pending_stripe_price' => $priceId]);

            $periodEnd = $subscription->getAttribute('current_period_end');
            $endsAt = $periodEnd instanceof Carbon
                ? $periodEnd->format('M j, Y')
                : null;

            return back()->with('toast', [
                'type' => 'success',
                'message' => $endsAt
                    ? "We'll switch you to {$plan['name']} on {$endsAt}."
                    : "We'll switch you to {$plan['name']} at your next billing cycle.",
            ]);
        }

        return $user
            ->newSubscription('default', $priceId)
            ->withMetadata([
                'plan_slug' => $planSlug,
            ])
            ->checkout([
                'success_url' => route('billing.index', ['checkout' => 'success']),
                'cancel_url' => route('billing.index', ['checkout' => 'cancelled']),
            ]);
    }

    public function cancel(Request $request): RedirectResponse
    {
        $subscription = $request->user()->subscription('default');

        if (! $subscription || ! $subscription->valid()) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'No active subscription to cancel.',
            ]);
        }

        if ($subscription->onGracePeriod()) {
            return back()->with('toast', [
                'type' => 'info',
                'message' => 'Cancellation is already scheduled.',
            ]);
        }

        $subscription->cancel();

        $endsAt = $subscription->ends_at?->format('M j, Y');

        return back()->with('toast', [
            'type' => 'success',
            'message' => $endsAt
                ? "Subscription cancelled. Access ends {$endsAt}."
                : 'Subscription cancelled.',
        ]);
    }

    public function resume(Request $request): RedirectResponse
    {
        $subscription = $request->user()->subscription('default');

        if (! $subscription || ! $subscription->onGracePeriod()) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'Nothing to resume.',
            ]);
        }

        $subscription->resume();

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Subscription resumed. Welcome back.',
        ]);
    }
}
