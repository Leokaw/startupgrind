<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $sender_id
 * @property string $receiver_id
 * @property string $topic
 * @property string $body
 * @property int $credits_cost
 * @property Carbon|null $read_at
 * @property-read User $sender
 * @property-read User $receiver
 */
class Message extends Model
{
    use HasUuids;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'topic',
        'body',
        'credits_cost',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'credits_cost' => 'integer',
            'read_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function isRead(): bool
    {
        return $this->read_at !== null;
    }

    public function markAsRead(): void
    {
        if (! $this->isRead()) {
            $this->update(['read_at' => now()]);
        }
    }
}
