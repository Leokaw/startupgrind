import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type FlashToastType = 'success' | 'error' | 'warning' | 'info';

type FlashToast = {
    type: FlashToastType;
    message: string;
};

type Flash = {
    success?: string | null;
    error?: string | null;
    toast?: FlashToast | null;
} | null;

type InertiaSuccessEvent = CustomEvent<{
    page?: {
        props?: {
            flash?: Flash;
        };
    };
}>;

function isInertiaSuccessEvent(event: Event): event is InertiaSuccessEvent {
    return (
        typeof (event as CustomEvent).detail === 'object' &&
        (event as CustomEvent).detail !== null &&
        'page' in (event as CustomEvent).detail
    );
}

export function useFlashToast(): void {
    useEffect(() => {
        const handler = (event: Event) => {
            if (!isInertiaSuccessEvent(event)) return;

            const flash = event.detail?.page?.props?.flash;

            if (!flash) return;

            // 1) Typed flash — preferred
            if (flash.toast?.message) {
                const { type, message } = flash.toast;
                const id = `flash:${type}:${message}`;

                switch (type) {
                    case 'error':
                        toast.error(message, { id });
                        break;
                    case 'warning':
                        toast.warning(message, { id });
                        break;
                    case 'info':
                        toast.info(message, { id });
                        break;
                    case 'success':
                    default:
                        toast.success(message, { id });
                        break;
                }
                return;
            }

            // 2) Legacy string flashes
            if (flash.success) {
                toast.success(flash.success, {
                    id: `flash:success:${flash.success}`,
                });
            }
            if (flash.error) {
                toast.error(flash.error, { id: `flash:error:${flash.error}` });
            }
        };

        return router.on('success', handler);
    }, []);
}
