<?php

namespace App\Http\Middleware;

use App\Enums\MembershipTier;
use App\Support\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Eager-load only the columns we need so this stays cheap.
        // loadMissing() is a no-op if it's already loaded elsewhere.
        $user?->loadMissing('membership:id,user_id,credits_balance,tier,status');

        $serviceCategories = ServiceCategory::all();

        return [
            ...parent::share($request),

            'serviceCategories' => $serviceCategories,
            'name' => config('app.name'),

            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'user_type' => $user->user_type,
                    'approved_at' => $user->approved_at,
                    'email_verified_at' => $user->email_verified_at,
                    'profile_photo_url' => $user->profile_photo_url,
                    'has_custom_profile_photo' => $user->hasCustomProfilePhoto(),

                    // Onboarding-relevant fields — needed by the
                    // settings/profile page and any UI that shows the
                    // user's bio / area of work / role.
                    'area_of_work' => $user->area_of_work,
                    'area_of_work_label' => $user->area_of_work_label,
                    'description' => $user->description,
                    'role' => $user->role,
                    'role_label' => $user->role_label,
                    'goal' => $user->goal,
                    'goal_label' => $user->goal_label,
                    'onboarded_at' => $user->onboarded_at,

                    // Membership is optional — a user may not have one yet.
                    'membership' => $user->membership ? [
                        'tier' => $user->membership->tier,
                        'status' => $user->membership->status,
                        'credits_balance' => $user->membership->credits_balance,
                    ] : null,
                ] : null,
            ],

            // 👇 The prop that OnboardingGate reads.
            // `required: true` while `onboarded_at` is null — i.e. the
            // moment a user registers and until they finish (or skip)
            // the flow in OnboardingController.
            'onboarding' => $user ? [
                'required' => $user->onboarded_at === null,
                'categories' => $serviceCategories,
            ] : null,

            // Feature-gate the "Team" tab in the user interaction modal.
            // True only when the current user has an active Pro (or higher)
            // membership. Guests and Free-tier users see the upsell prompt.
            'can_view_team' => $user?->membership
                ? $user->membership->isAtLeast(MembershipTier::PRO)
                : false,

            'unreadNotificationsCount' => $user
                ? $user->unreadNotifications()->count()
                : 0,

            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),

                // 👇 OnboardingController writes ->with('toast', [...]) —
                // without this entry the flash is silently discarded.
                'toast' => fn () => $request->session()->get('toast'),
            ],

            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
