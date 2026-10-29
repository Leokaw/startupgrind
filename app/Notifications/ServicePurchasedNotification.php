<?php

namespace App\Notifications;

use App\Models\CompanyService;
use App\Models\Membership;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ServicePurchasedNotification extends Notification
{
    use Queueable;

    /**
     * @param  'purchased'|'sold'  $direction
     */
    public function __construct(
        public Purchase $purchase,
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
        /** @var CompanyService $service */
        $service = $this->purchase->purchasable;
        $serviceName = $service->getAttribute('name') ?? 'Service';

        $base = [
            'purchase_id' => $this->purchase->id,
            'service_id' => $service->getAttribute('id'),
            'service_name' => $serviceName,
            'direction' => $this->direction,
        ];

        /** @var User $buyer */
        $buyer = $this->purchase->buyer;

        if ($this->direction === 'purchased') {
            /** @var Membership $membership */
            $membership = $buyer->membership;
            $balanceAfter = $membership->credits_balance ?? 0;
            $balanceBefore = $balanceAfter + $this->purchase->subtotal;

            /** @var User $seller */
            $seller = $this->purchase->seller;

            return $base + [
                'title' => 'Service purchased',
                'body' => "You purchased \"{$serviceName}\" from {$seller->name}.",
                'seller_id' => $this->purchase->seller_id,
                'seller_name' => $seller->name,
                'credits_spent' => $this->purchase->subtotal,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
            ];
        }

        // 'sold'
        return $base + [
            'title' => 'Service sold',
            'body' => "{$buyer->name} purchased \"{$serviceName}\" from you.",
            'buyer_id' => $this->purchase->buyer_id,
            'buyer_name' => $buyer->name,
            'credits_earned' => $this->purchase->seller_payout,
        ];
    }
}
