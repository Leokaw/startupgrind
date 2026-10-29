import { Head, usePage } from '@inertiajs/react';
import PublicHeader from '@/components/public-home/public-header';
import Home from '@/components/public-home/home/home';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />

            <div className="force-light flex min-h-screen flex-col bg-background text-foreground">
                <PublicHeader auth={auth} />
                <main className="flex-1">
                    <Home />
                </main>
            </div>
        </>
    );
}
