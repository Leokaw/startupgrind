<?php

namespace App\Models;

use App\Enums\CreditTransactionCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $membership_id
 * @property string $user_id
 * @property int|null $purchase_id
 * @property int $amount
 * @property int $balance_after
 * @property CreditTransactionCategory $category
 * @property string|null $description
 * @property string|null $reference_type
 * @property string|null $reference_id
 * @property array<string, mixed>|null $metadata
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Membership $membership
 * @property-read User $user
 * @property-read Purchase|null $purchase
 * @property-read Model|null $reference
 */
class CreditTransaction extends Model
{
    use HasUuids;

    protected $fillable = [
        'membership_id',
        'user_id',
        'purchase_id',
        'amount',
        'balance_after',
        'category',
        'description',
        'reference_type',
        'reference_id',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'integer',
            'balance_after' => 'integer',
            'category' => CreditTransactionCategory::class,
            'metadata' => 'array',
        ];
    }

    /**
     * @return BelongsTo<Membership, $this>
     */
    public function membership(): BelongsTo
    {
        return $this->belongsTo(Membership::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Purchase, $this>
     */
    public function purchase(): BelongsTo
    {
        return $this->belongsTo(Purchase::class);
    }

    /**
     * @return MorphTo<Model, $this>
     */
    public function reference(): MorphTo
    {
        return $this->morphTo();
    }

    public function isCredit(): bool
    {
        return $this->amount > 0 && $this->category->isCredit();
    }

    public function isDebit(): bool
    {
        return $this->amount < 0 && ! $this->category->isCredit();
    }

    public function isMarketplaceEntry(): bool
    {
        return $this->category->isMarketplaceTransaction()
            && $this->purchase_id !== null;
    }

    public function counterpartTransaction(): ?self
    {
        if (! $this->isMarketplaceEntry()) {
            return null;
        }

        return self::query()
            ->where('purchase_id', $this->purchase_id)
            ->where('id', '!=', $this->id)
            ->first();
    }

    public function signedAmount(): string
    {
        return ($this->amount >= 0 ? '+' : '−').abs($this->amount);
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeCredits(Builder $query): Builder
    {
        return $query->where('amount', '>', 0);
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeDebits(Builder $query): Builder
    {
        return $query->where('amount', '<', 0);
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeOfCategory(Builder $query, CreditTransactionCategory $category): Builder
    {
        return $query->where('category', $category->value);
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeForUser(Builder $query, User|string $user): Builder
    {
        return $query->where(
            'user_id',
            $user instanceof User ? $user->id : $user,
        );
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeForPurchase(Builder $query, Purchase|string $purchase): Builder
    {
        return $query->where(
            'purchase_id',
            $purchase instanceof Purchase ? $purchase->id : $purchase,
        );
    }

    /**
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeBetween(Builder $query, Carbon $from, Carbon $to): Builder
    {
        return $query->whereBetween('created_at', [$from, $to]);
    }
}
