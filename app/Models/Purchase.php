<?php

namespace App\Models;

use App\Enums\PurchaseStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @property int $id
 * @property string $buyer_id
 * @property string $seller_id
 * @property string $purchasable_type
 * @property string $purchasable_id
 * @property int $subtotal
 * @property int $platform_fee
 * @property int $seller_payout
 * @property PurchaseStatus $status
 * @property Carbon|null $completed_at
 * @property Carbon|null $refunded_at
 * @property Carbon|null $canceled_at
 * @property array<string, mixed>|null $metadata
 * @property-read User $buyer
 * @property-read User $seller
 * @property-read Model $purchasable
 * @property-read Collection<int, CreditTransaction> $creditTransactions
 */
class Purchase extends Model
{
    use HasUuids;

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'purchasable_type',
        'purchasable_id',
        'subtotal',
        'platform_fee',
        'seller_payout',
        'status',
        'completed_at',
        'refunded_at',
        'canceled_at',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'status' => PurchaseStatus::class,
            'subtotal' => 'integer',
            'platform_fee' => 'integer',
            'seller_payout' => 'integer',
            'completed_at' => 'datetime',
            'refunded_at' => 'datetime',
            'canceled_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    /**
     * @return MorphTo<Model, $this>
     */
    public function purchasable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return HasMany<CreditTransaction, $this>
     */
    public function creditTransactions(): HasMany
    {
        return $this->hasMany(CreditTransaction::class);
    }

    public function buyerTransaction(): ?CreditTransaction
    {
        $transaction = $this->creditTransactions
            ->firstWhere('user_id', $this->buyer_id);

        return $transaction instanceof CreditTransaction ? $transaction : null;
    }

    public function sellerTransaction(): ?CreditTransaction
    {
        $transaction = $this->creditTransactions
            ->firstWhere('user_id', $this->seller_id);

        return $transaction instanceof CreditTransaction ? $transaction : null;
    }

    public function isPending(): bool
    {
        return $this->status === PurchaseStatus::PENDING;
    }

    public function isCompleted(): bool
    {
        return $this->status === PurchaseStatus::COMPLETED;
    }

    public function isRefunded(): bool
    {
        return $this->status === PurchaseStatus::REFUNDED;
    }

    public function isDisputed(): bool
    {
        return $this->status === PurchaseStatus::DISPUTED;
    }

    public function isCanceled(): bool
    {
        return $this->status === PurchaseStatus::CANCELED;
    }

    public function isRefundable(): bool
    {
        return $this->status === PurchaseStatus::COMPLETED;
    }

    public function isCancelable(): bool
    {
        return $this->status === PurchaseStatus::PENDING;
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', PurchaseStatus::COMPLETED);
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeForBuyer(Builder $query, User|string $buyer): Builder
    {
        return $query->where('buyer_id', $buyer instanceof User ? $buyer->id : $buyer);
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeForSeller(Builder $query, User|string $seller): Builder
    {
        return $query->where('seller_id', $seller instanceof User ? $seller->id : $seller);
    }
}
