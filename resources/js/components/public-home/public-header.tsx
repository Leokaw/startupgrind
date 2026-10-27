import { useState, useEffect, type MouseEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import {
    ChevronRight,
    Menu,
    MessagesSquare,
    SquareArrowUpRight,
    Loader2,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { dashboard, login, register } from '@/routes';
import AppLogo from '@/components/app-logo';
import { LanguageSwitcher } from '../language-switcher';
import { cn } from '@/lib/utils';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        } | null;
    };
};

const NAV_ITEMS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'FAQ', href: '#faq' },
];

// EmailJS config — only the PUBLIC key belongs in the browser.
const EMAILJS_PUBLIC_KEY = 'gO1uoQT1AmEmllMjb';
const EMAILJS_SERVICE_ID = 'service_m7m7s1f';
const EMAILJS_TEMPLATE_ID = 'template_79sx6ro';

export default function PublicHeader({ auth }: Props) {
    const [activeSection, setActiveSection] = useState('#home');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Inertia's useForm gives us the same `errors`, `clearErrors`,
    // `setError`, `reset`, `data`, `setData` shape Laravel returns
    // when a validation exception is thrown (422).
    const { data, setData, errors, setError, clearErrors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    // Init EmailJS once on mount.
    useEffect(() => {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }, []);

    // Scroll Spy: Detect which section is currently in view
    useEffect(() => {
        const sections = document.querySelectorAll('section[id], div[id]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
            },
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    // Core scroll logic
    const performScroll = (href: string) => {
        if (href === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            const offset = 100;
            const elementPosition =
                element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = (
        e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
        href: string,
    ) => {
        e.preventDefault();

        if (isDrawerOpen) {
            setIsDrawerOpen(false);
            setTimeout(() => {
                performScroll(href);
            }, 250);
        } else {
            performScroll(href);
        }
    };

    /**
     * Client-side validation that mirrors Laravel's messages.
     * Since EmailJS has no server to validate on, we set errors
     * via Inertia's setError so the UX matches a Laravel form.
     */
    const validateContact = () => {
        clearErrors();
        let valid = true;

        if (!data.name.trim()) {
            setError('name', 'The name field is required.');
            valid = false;
        } else if (data.name.trim().length < 2) {
            setError('name', 'The name must be at least 2 characters.');
            valid = false;
        }

        if (!data.email.trim()) {
            setError('email', 'The email field is required.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            setError('email', 'The email must be a valid email address.');
            valid = false;
        }

        if (!data.message.trim()) {
            setError('message', 'The message field is required.');
            valid = false;
        } else if (data.message.trim().length < 10) {
            setError(
                'message',
                'The message must be at least 10 characters.',
            );
            valid = false;
        }

        return valid;
    };

    const handleContactSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        if (!validateContact()) return;

        setIsSubmitting(true);

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name: data.name,
                email: data.email,
                message: data.message,
                time: new Date().toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                }),
            });

            toast.success('Message sent! We will get back to you shortly.');
            reset();
            clearErrors();
            setIsContactOpen(false);
        } catch (err) {
            console.error('EmailJS error:', err);
            toast.error('Failed to send your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <header className="sticky force-light top-0 z-50 w-full">
            {/* Top Red Banner */}
            <div className="bg-red-600 text-white">
                <div className="flex min-h-12 flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-2 text-center text-sm">
                    <span>
                        Does your business have a monthly revenue of over
                        50,000 €? Take advantage of exclusive conditions!
                    </span>

                    {/* Talk to us → opens the contact dialog */}
                    <Dialog
                        open={isContactOpen}
                        onOpenChange={(open) => {
                            setIsContactOpen(open);
                            if (!open) clearErrors();
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button size="sm" variant="default">
                                Talk to us{' '}
                                <MessagesSquare size={76} strokeWidth={1.25} />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Talk to us</DialogTitle>
                                <DialogDescription>
                                    Tell us a bit about your business and
                                    we&apos;ll be in touch.
                                </DialogDescription>
                            </DialogHeader>

                            <form
                                onSubmit={handleContactSubmit}
                                className="space-y-4"
                                noValidate
                            >
                                {/* Name */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact-name"
                                        className="text-sm font-medium"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="contact-name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Your name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        disabled={isSubmitting}
                                        aria-invalid={!!errors.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact-email"
                                        className="text-sm font-medium"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="contact-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@company.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        disabled={isSubmitting}
                                        aria-invalid={!!errors.email}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact-message"
                                        className="text-sm font-medium"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        placeholder="What can we help you with?"
                                        value={data.message}
                                        onChange={(e) =>
                                            setData('message', e.target.value)
                                        }
                                        disabled={isSubmitting}
                                        aria-invalid={!!errors.message}
                                        className={cn(
                                            'min-h-[120px] w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30',
                                            'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                                        )}
                                    />
                                    <InputError message={errors.message} />
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsContactOpen(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {isSubmitting
                                            ? 'Sending…'
                                            : 'Send message'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="w-full border-b force-light border-border/40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
                <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex shrink-0 items-center">
                        <Link href="/">
                            <img
                                src="/branding/logo-big.png"
                                alt="Startup Grind"
                                className="hidden h-7 w-auto object-contain md:block"
                            />
                            <div className="block md:hidden">
                                <AppLogo />
                            </div>
                        </Link>
                    </div>

                    {/* Center Links (Desktop) */}
                    <nav className="hidden items-center gap-2 md:flex">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.href;
                            return (
                                <Button
                                    key={item.label}
                                    variant={isActive ? 'default' : 'outline'}
                                    size="sm"
                                    className={cn(
                                        !isActive && 'dark:text-gray-100',
                                    )}
                                    asChild
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) =>
                                            handleScroll(e, item.href)
                                        }
                                    >
                                        {item.label}
                                    </a>
                                </Button>
                            );
                        })}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-2 md:flex">
                            {auth.user ? (
                                <Button asChild>
                                    <Link href={dashboard()}>Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="dark:text-gray-100"
                                    >
                                        <Link href={login()}>
                                            Login{' '}
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild size="sm">
                                        <Link href={register()}>
                                            Register{' '}
                                            <SquareArrowUpRight
                                                size={56}
                                                strokeWidth={1.75}
                                            />
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="hidden md:block">
                            <LanguageSwitcher />
                        </div>

                        {/* Mobile Drawer Menu */}
                        <div className="flex items-center gap-2 md:hidden">
                            <LanguageSwitcher />
                            <Drawer
                                open={isDrawerOpen}
                                onOpenChange={setIsDrawerOpen}
                                direction="right"
                            >
                                <DrawerTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0"
                                    >
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent className="h-full w-[300px]">
                                    <DrawerHeader className="border-b text-left">
                                        <DrawerTitle>Menu</DrawerTitle>
                                    </DrawerHeader>

                                    <div className="flex flex-col gap-6 overflow-y-auto p-4">
                                        <nav className="flex flex-col gap-2">
                                            {NAV_ITEMS.map((item) => {
                                                const isActive =
                                                    activeSection === item.href;
                                                return (
                                                    <Button
                                                        key={item.label}
                                                        variant={
                                                            isActive
                                                                ? 'default'
                                                                : 'ghost'
                                                        }
                                                        className={cn(
                                                            'w-full justify-start',
                                                            !isActive &&
                                                                'dark:text-gray-100',
                                                        )}
                                                        onClick={(e) =>
                                                            handleScroll(
                                                                e,
                                                                item.href,
                                                            )
                                                        }
                                                    >
                                                        {item.label}
                                                    </Button>
                                                );
                                            })}
                                        </nav>

                                        <div className="h-px w-full bg-border" />

                                        <div className="flex flex-col gap-3">
                                            {auth.user ? (
                                                <DrawerClose asChild>
                                                    <Button
                                                        className="w-full"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={dashboard()}
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    </Button>
                                                </DrawerClose>
                                            ) : (
                                                <>
                                                    <DrawerClose asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full dark:text-gray-100"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={login()}
                                                            >
                                                                Login{' '}
                                                                <ChevronRight className="ml-2 h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </DrawerClose>
                                                    <DrawerClose asChild>
                                                        <Button
                                                            className="w-full"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={register()}
                                                            >
                                                                Register{' '}
                                                                <SquareArrowUpRight
                                                                    className="ml-2 h-4 w-4"
                                                                    strokeWidth={
                                                                        1.75
                                                                    }
                                                                />
                                                            </Link>
                                                        </Button>
                                                    </DrawerClose>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}