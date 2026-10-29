<?php

namespace App\Notifications;

use App\Models\Message;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class MessageNotification extends Notification
{
    use Queueable;

    /**
     * @param  'sent'|'received'  $direction
     */
    public function __construct(
        public Message $message,
        public string $direction,
    ) {}

    /**
     * @return list<string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        /** @var User $sender */
        $sender = $this->message->sender;
        /** @var User $receiver */
        $receiver = $this->message->receiver;

        $base = [
            'message_id' => $this->message->id,
            'topic' => $this->message->topic,
            'direction' => $this->direction,
        ];

        if ($this->direction === 'sent') {
            $balanceAfter = optional($sender->membership)->credits_balance ?? 0;
            $creditsCost = $this->message->credits_cost;
            $balanceBefore = $balanceAfter + $creditsCost;

            return $base + [
                'title' => 'Message sent',
                'body' => "You sent a message to {$receiver->name}.",
                'receiver_id' => $receiver->id,
                'receiver_name' => $receiver->name,
                'credits_spent' => $creditsCost,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
            ];
        }

        return $base + [
            'title' => 'New message received',
            'body' => "{$sender->name} sent you a message.",
            'sender_id' => $sender->id,
            'sender_name' => $sender->name,
            'message_body' => $this->message->body,
        ];
    }
}
