<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $user_id
 * @property string $token
 * @property string $plan_slug
 * @property string $status
 * @property string|null $stripe_checkout_session_id
 * @property string|null $stripe_subscription_id
 * @property Carbon|null $ready_at
 * @property Carbon|null $completed_at
 * @property Carbon|null $expires_at
 * @property-read User $user
 */
class SubscriptionSuccessToken extends Model
{
    protected $fillable = [
        'user_id',
        'token',
        'plan_slug',
        'status',
        'stripe_checkout_session_id',
        'stripe_subscription_id',
        'ready_at',
        'completed_at',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'ready_at' => 'datetime',
            'completed_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function markReady(?string $checkoutSessionId = null, ?string $subscriptionId = null): void
    {
        if ($this->status !== 'pending') {
            return;
        }

        $this->update([
            'status' => 'ready',
            'stripe_checkout_session_id' => $checkoutSessionId ?? $this->stripe_checkout_session_id,
            'stripe_subscription_id' => $subscriptionId ?? $this->stripe_subscription_id,
            'ready_at' => now(),
        ]);
    }

    public function isUsable(): bool
    {
        return $this->expires_at === null || $this->expires_at->isFuture();
    }
}
