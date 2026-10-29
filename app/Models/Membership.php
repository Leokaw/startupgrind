<?php

namespace App\Models;

use App\Enums\MembershipTier;
use Database\Factories\MembershipFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * @property int $id
 * @property string $user_id
 * @property MembershipTier $tier
 * @property string $status
 * @property int $credits_balance
 * @property int $monthly_credits
 * @property int $free_messages_used
 * @property Carbon|null $credits_reset_at
 * @property Carbon|null $bonus_credits_awarded_at
 * @property string|null $external_customer_id
 * @property string|null $external_subscription_id
 * @property Carbon|null $current_period_start
 * @property Carbon|null $current_period_end
 * @property bool $cancel_at_period_end
 * @property Carbon|null $trial_ends_at
 * @property Carbon|null $canceled_at
 * @property-read User $user
 */
class Membership extends Model
{
    /** @use HasFactory<MembershipFactory> */
    use HasFactory, HasUuids;

    public const STATUS_ACTIVE = 'active';

    public const STATUS_TRIALING = 'trialing';

    public const STATUS_PAST_DUE = 'past_due';

    public const STATUS_CANCELED = 'canceled';

    public const STATUS_INCOMPLETE = 'incomplete';

    public const STATUS_PAUSED = 'paused';

    protected $fillable = [
        'user_id',
        'tier',
        'status',
        'credits_balance',
        'monthly_credits',
        'free_messages_used',
        'credits_reset_at',
        'bonus_credits_awarded_at',
        'external_customer_id',
        'external_subscription_id',
        'current_period_start',
        'current_period_end',
        'cancel_at_period_end',
        'trial_ends_at',
        'canceled_at',
    ];

    protected function casts(): array
    {
        return [
            'tier' => MembershipTier::class,
            'credits_balance' => 'integer',
            'monthly_credits' => 'integer',
            'free_messages_used' => 'integer',
            'credits_reset_at' => 'datetime',
            'bonus_credits_awarded_at' => 'datetime',
            'current_period_start' => 'datetime',
            'current_period_end' => 'datetime',
            'cancel_at_period_end' => 'boolean',
            'trial_ends_at' => 'datetime',
            'canceled_at' => 'datetime',
        ];
    }

    /* -----------------------------------------------------------------
     |  Relationships
     | ----------------------------------------------------------------- */

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany<CreditTransaction, $this>
     */
    public function creditTransactions(): HasMany
    {
        return $this->hasMany(CreditTransaction::class)->latest();
    }

    /**
     * @return HasManyThrough<Purchase, User, $this>
     */
    public function purchases(): HasManyThrough
    {
        return $this->hasManyThrough(
            Purchase::class,
            User::class,
            'id',
            'buyer_id',
            'user_id',
            'id',
        );
    }

    /**
     * @return HasManyThrough<Purchase, User, $this>
     */
    public function sales(): HasManyThrough
    {
        return $this->hasManyThrough(
            Purchase::class,
            User::class,
            'id',
            'seller_id',
            'user_id',
            'id',
        );
    }

    /* -----------------------------------------------------------------
     |  Tier helpers
     | ----------------------------------------------------------------- */

    public function isFree(): bool
    {
        return $this->tier === MembershipTier::FREE;
    }

    public function isPro(): bool
    {
        return $this->tier === MembershipTier::PRO;
    }

    public function isAtLeast(MembershipTier $tier): bool
    {
        return $this->tier->level() >= $tier->level();
    }

    public function compareTo(MembershipTier $tier): int
    {
        return $this->tier->level() <=> $tier->level();
    }

    /* -----------------------------------------------------------------
     |  Status helpers
     | ----------------------------------------------------------------- */

    public function isActive(): bool
    {
        return in_array($this->status, [
            self::STATUS_ACTIVE,
            self::STATUS_TRIALING,
        ], true);
    }

    public function isTrialing(): bool
    {
        return $this->status === self::STATUS_TRIALING
            && $this->trial_ends_at?->isFuture();
    }

    public function isPastDue(): bool
    {
        return $this->status === self::STATUS_PAST_DUE;
    }

    public function isCanceled(): bool
    {
        return $this->status === self::STATUS_CANCELED
            || $this->canceled_at !== null;
    }

    public function hasEnded(): bool
    {
        return $this->current_period_end !== null
            && $this->current_period_end->isPast();
    }

    public function isCancelingAtPeriodEnd(): bool
    {
        return $this->cancel_at_period_end && ! $this->hasEnded();
    }

    /* -----------------------------------------------------------------
     |  Credit helpers
     | ----------------------------------------------------------------- */

    public function applySubscription(
        MembershipTier $tier,
        string $externalSubscriptionId,
        ?Carbon $periodStart = null,
        ?Carbon $periodEnd = null,
        int $signupBonusCredits = 0,
    ): void {
        if ($this->external_subscription_id === $externalSubscriptionId) {
            return;
        }

        DB::transaction(function () use (
            $tier,
            $externalSubscriptionId,
            $periodStart,
            $periodEnd,
            $signupBonusCredits,
        ) {
            /** @var self $fresh */
            $fresh = self::query()->lockForUpdate()->find($this->id);

            $fresh->update([
                'tier' => $tier,
                'status' => self::STATUS_ACTIVE,
                'monthly_credits' => $tier->monthlyCredits(),
                'external_subscription_id' => $externalSubscriptionId,
                'current_period_start' => $periodStart ?? $fresh->current_period_start,
                'current_period_end' => $periodEnd ?? $fresh->current_period_end,
                'credits_reset_at' => $periodEnd ?? now()->addMonth(),
                'cancel_at_period_end' => false,
                'canceled_at' => null,
            ]);

            if ($signupBonusCredits > 0 && $fresh->bonus_credits_awarded_at === null) {
                $fresh->increment('credits_balance', $signupBonusCredits);
                $fresh->update(['bonus_credits_awarded_at' => now()]);
            }

            $this->setRawAttributes($fresh->getAttributes(), true);
        });
    }

    public function hasCredits(int $amount = 1): bool
    {
        return $this->credits_balance >= $amount;
    }

    public function isOutOfCredits(): bool
    {
        return $this->credits_balance <= 0;
    }

    public function isDueForCreditReset(): bool
    {
        return $this->credits_reset_at !== null
            && $this->credits_reset_at->isPast()
            && $this->isActive();
    }

    public function daysUntilReset(): ?int
    {
        if ($this->credits_reset_at === null) {
            return null;
        }

        return max(0, (int) now()->diffInDays($this->credits_reset_at, false));
    }

    public function nextResetDate(): ?Carbon
    {
        return $this->credits_reset_at;
    }

    /* -----------------------------------------------------------------
     |  Scopes
     | ----------------------------------------------------------------- */

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->whereIn('status', [
            self::STATUS_ACTIVE,
            self::STATUS_TRIALING,
        ]);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    public function scopeOfTier(Builder $query, MembershipTier $tier): Builder
    {
        return $query->where('tier', $tier->value);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    public function scopeDueForCreditReset(Builder $query): Builder
    {
        return $query
            ->whereNotNull('credits_reset_at')
            ->where('credits_reset_at', '<=', now())
            ->whereIn('status', [
                self::STATUS_ACTIVE,
                self::STATUS_TRIALING,
            ]);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    public function scopeTrialing(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_TRIALING);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    public function scopeCanceled(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_CANCELED);
    }

    public function limit(string $key, int $default = 0): int
    {
        return (int) config("subscriptions.plans.{$this->tier->value}.limits.$key", $default);
    }

    public function flag(string $key): bool
    {
        return (bool) config("subscriptions.plans.{$this->tier->value}.flags.$key", false);
    }

    public function isUnlimited(string $key): bool
    {
        return $this->limit($key) === -1;
    }

    public function freeMessagesRemaining(): int
    {
        return (int) max(0, $this->limit('free_messages_per_month') - $this->free_messages_used);
    }

    public function canSeeCompanyEmployees(): int
    {
        return $this->limit('company_employee_view_limit');
    }

    public function supportResponseHours(): int
    {
        return $this->limit('support_response_hours', 72);
    }
}
