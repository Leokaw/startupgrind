<?php

namespace App\Models;

use Database\Factories\DiscountTicketFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $user_id
 * @property string $code
 * @property string $name
 * @property string|null $description
 * @property string|null $event_url
 * @property float|null $discount_percentage
 * @property float|null $discount_amount
 * @property Carbon|null $valid_from
 * @property Carbon|null $valid_until
 * @property int|null $usage_limit
 * @property int $times_used
 * @property bool $is_active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read User $user
 */
class DiscountTicket extends Model
{
    /** @use HasFactory<DiscountTicketFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'code',
        'name',
        'description',
        'event_url',
        'discount_percentage',
        'discount_amount',
        'valid_from',
        'valid_until',
        'usage_limit',
        'times_used',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'valid_from' => 'datetime',
            'valid_until' => 'datetime',
            'discount_percentage' => 'float',
            'discount_amount' => 'float',
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
