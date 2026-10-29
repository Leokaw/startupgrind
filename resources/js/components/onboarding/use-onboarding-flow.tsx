import { router } from '@inertiajs/react';
import { useCallback, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Briefcase, Calendar, Ticket, UserPlus, Users } from 'lucide-react';

/* =================================================================
 |  Types
 | ================================================================= */

export type Feature = {
    title: string;
    description: string;
    image: string;
    icon: ReactNode;
};

export type ChoiceGroupItem = {
    value: string;
    label: string;
    description?: string;
    icon?: ReactNode;
};

/* =================================================================
 |  Config
 | ================================================================= */

export const FEATURES: Feature[] = [
    {
        title: 'Sell your services',
        description:
            'Create company services and sell them directly to the community — from consulting to design sprints to code reviews.',
        image: '/onboarding/part1_1.webp',
        icon: <Briefcase className="size-5" />,
    },
    {
        title: 'Create discounted tickets',
        description:
            'Offer discount codes for your events so more people can show up. Boost attendance without cutting your margins.',
        image: '/onboarding/part1_2.webp',
        icon: <Ticket className="size-5" />,
    },
    {
        title: 'Invite your team',
        description:
            'Bring employees into your workspace. Everyone gets access to the same profile, services, and community tools.',
        image: '/onboarding/part1_3.webp',
        icon: <UserPlus className="size-5" />,
    },
    {
        title: 'Explore the community',
        description:
            'Browse founders, investors, and operators from around the world. Reach out directly or request a warm intro.',
        image: '/onboarding/part1_4.webp',
        icon: <Users className="size-5" />,
    },
    {
        title: 'Discover events',
        description:
            'Find chapter meetups, workshops, and the global conference. RSVP and see who else is attending before you go.',
        image: '/onboarding/part1_5.webp',
        icon: <Calendar className="size-5" />,
    },
];

export const ROLES: ChoiceGroupItem[] = [
    { value: 'founder', label: 'Founder', description: 'Building a company' },
    { value: 'investor', label: 'Investor', description: 'Backing founders' },
    { value: 'operator', label: 'Operator', description: 'Scaling teams' },
    {
        value: 'freelancer',
        label: 'Freelancer',
        description: 'Available for hire',
    },
    { value: 'designer', label: 'Designer', description: 'Design & brand' },
    { value: 'developer', label: 'Developer', description: 'Building product' },
];

export const GOALS: ChoiceGroupItem[] = [
    { value: 'raise', label: 'Raise funds' },
    { value: 'cofounder', label: 'Find a co-founder' },
    { value: 'hire', label: 'Hire talent' },
    { value: 'network', label: 'Grow my network' },
    { value: 'learn', label: 'Learn from others' },
    { value: 'events', label: 'Find events' },
];

export const TIPS: string[] = [
    'Complete your profile, a short description and a photo go a long way.',
    'Use saved searches to get notified when someone matching your filters joins.',
    'RSVP early to popular chapter events. Spots fill up fast.',
    'Warm intros take a couple of days. Plan ahead before big conferences.',
];

export const TOTAL_STEPS = 6;

/* =================================================================
 |  Helpers
 | ================================================================= */

export function categoriesToOptions(
    categories: Record<string, string>,
): ChoiceGroupItem[] {
    return Object.entries(categories).map(([value, label]) => ({
        value,
        label,
    }));
}

/* =================================================================
 |  Hook
 | ================================================================= */

type OnboardingFlowOptions = {
    categories: Record<string, string>;
    onClose: () => void;
};

export function useOnboardingFlow({
    categories,
    onClose,
}: OnboardingFlowOptions) {
    // ── Step 1 ────────────────────────────────────────────────────────
    const [featureIndex, setFeatureIndex] = useState(0);
    const [visitedFeatures, setVisitedFeatures] = useState<Set<number>>(
        () => new Set([0]),
    );

    const selectFeature = useCallback((i: number) => {
        setFeatureIndex(i);
        setVisitedFeatures((prev) => {
            if (prev.has(i)) return prev;
            const next = new Set(prev);
            next.add(i);
            return next;
        });
    }, []);

    const allFeaturesVisited = visitedFeatures.size >= FEATURES.length;

    // ── Step 2–5 ──────────────────────────────────────────────────────
    const [role, setRole] = useState<string | null>(null);
    const [goal, setGoal] = useState<string | null>(null);
    const [industry, setIndustry] = useState<string | null>(null);
    const [description, setDescription] = useState('');

    // ── Shared ────────────────────────────────────────────────────────
    const [submitting, setSubmitting] = useState(false);

    const resolvedAreaOfWork =
        industry && categories[industry] !== undefined ? industry : null;

    const submit = useCallback(() => {
        setSubmitting(true);

        router.post(
            '/onboarding/complete',
            {
                role,
                goal,
                area_of_work: resolvedAreaOfWork,
                description: description.trim() || null,
            },
            {
                preserveScroll: true, // 👈 don't jump the page
                preserveState: true, // 👈 keep the layout mounted (was false)
                onSuccess: () => {
                    onClose();
                    toast.success("You're all set. Welcome aboard!");
                },
                onError: (errors) => {
                    const hasFieldErrors =
                        errors && Object.keys(errors).length > 0;
                    if (!hasFieldErrors) {
                        toast.error('Something went wrong. Please try again.');
                    }
                },
                onFinish: () => setSubmitting(false),
            },
        );
    }, [role, goal, resolvedAreaOfWork, description, onClose]);

    return {
        featureIndex,
        selectFeature,
        allFeaturesVisited,

        role,
        setRole,

        goal,
        setGoal,

        industry,
        setIndustry,

        description,
        setDescription,

        resolvedAreaOfWork,

        submitting,
        submit,
    };
}

export type OnboardingFlow = ReturnType<typeof useOnboardingFlow>;
