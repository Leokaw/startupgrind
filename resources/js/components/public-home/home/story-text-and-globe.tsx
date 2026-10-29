import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Variants } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TextAnimate } from '@/components/ui/text-animate';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

const visible = { overflow: 'visible' } as const;

function Corner({ className }: { className: string }) {
    return (
        <span
            aria-hidden
            className={`absolute z-20 size-1.5 bg-primary ${className}`}
        />
    );
}

const FADE_STAGGER_MS = 300;
const leftText = "Engage with the world's leading startup community";

const p1Text =
    "Founded in 2010, Startup Grind is the largest community for startup founders in the world. With 5M members, 300 chapters in 125 countries, we've spent 15 years connecting founders with the resources and relationships they need to grow.";
const p2Text =
    'Our network is powered by 2,000+ local volunteer directors who organize monthly events, alongside a robust digital community. In 2026, our global conference in Silicon Valley brought together over 5,000 founders, generating 14.5 million brand impressions.';
const p3Text =
    'Our partners play a central role in this ecosystem, gaining exposure to a highly targeted, founder-dense audience at the exact moment key adoption decisions are being made.';

const countWords = (text: string) => text.split(' ').length;

// ─── Sequencing / speed tuning ───────────────────────────────────────────────
const WORD_STAGGER = 0.02; // was effectively ~0.1s default → 2.5× faster
const WORD_SETTLE = 0.4; // approx. time for the last word's spring to settle
const PARAGRAPH_GAP = 0.12; // small pause between paragraph hand-offs

const headingWords = countWords(leftText);
const p1Words = countWords(p1Text);
const p2Words = countWords(p2Text);
const p3Words = countWords(p3Text);

const paragraphDuration = (words: number) =>
    (words - 1) * WORD_STAGGER + WORD_SETTLE;

const headingDelay = 0;
const p1Delay = headingDelay + paragraphDuration(headingWords) + PARAGRAPH_GAP;
const p2Delay = p1Delay + paragraphDuration(p1Words) + PARAGRAPH_GAP;
const p3Delay = p2Delay + paragraphDuration(p2Words) + PARAGRAPH_GAP;

// Total time until p3's last word has settled — used for showExtras timing
const TEXT_DONE_MS = (p3Delay + paragraphDuration(p3Words)) * 1000;

// Custom container variants: faster word stagger + per-paragraph delay
const makeSequenceVariants = (delayChildren: number): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: WORD_STAGGER, delayChildren },
    },
});

export default function StoryTextAndGlobe() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [showExtras, setShowExtras] = useState(false);

    useEffect(() => {
        if (!inView) return;
        const timer = setTimeout(() => setShowExtras(true), TEXT_DONE_MS);
        return () => clearTimeout(timer);
    }, [inView]);

    const animate = inView ? 'visible' : 'hidden';

    return (
        <div
            ref={ref}
            className="relative flex flex-col border-b border-border px-2 md:flex-row lg:col-span-2 lg:border-r lg:border-b-0 lg:px-0"
        >
            <Corner className="-top-[3.5px] -right-[3.5px] hidden lg:block" />
            <Corner className="-right-[3.5px] -bottom-[3.5px] hidden lg:block" />

            {/* Text Area */}
            <div className="flex flex-1 flex-col p-4 lg:p-10">
                <h2 className="text-3xl leading-[1.1] font-thin tracking-tight text-foreground lg:text-3xl">
                    <TextAnimate
                        as="span"
                        by="word"
                        type="fadeInUp"
                        text={leftText}
                        className="text-gray-700"
                        style={visible}
                        animate={animate}
                        variants={makeSequenceVariants(headingDelay)}
                    />
                </h2>

                <div className="mt-8 border-l-4 border-primary pl-4">
                    <TextAnimate
                        as="p"
                        by="word"
                        type="fadeInUp"
                        text={p1Text}
                        className="text-base leading-tight font-medium text-foreground"
                        style={visible}
                        animate={animate}
                        variants={makeSequenceVariants(p1Delay)}
                    />
                </div>

                <div className="mt-6 space-y-4 leading-tight text-muted-foreground">
                    <TextAnimate
                        as="p"
                        by="word"
                        type="fadeInUp"
                        className="text-base leading-tight font-thin text-foreground"
                        text={p2Text}
                        style={visible}
                        animate={animate}
                        variants={makeSequenceVariants(p2Delay)}
                    />
                    <TextAnimate
                        as="p"
                        by="word"
                        type="fadeInUp"
                        text={p3Text}
                        className="text-base leading-tight font-thin text-foreground"
                        style={visible}
                        animate={animate}
                        variants={makeSequenceVariants(p3Delay)}
                    />
                </div>

                <div
                    className={cn(
                        'mt-8',
                        showExtras ? 'story-fade-in' : 'invisible opacity-0',
                    )}
                    style={{ animationDelay: `${FADE_STAGGER_MS}ms` }}
                >
                    <Button
                        asChild
                        size="sm"
                        className="!h-9 w-full px-10 text-base sm:w-auto"
                    >
                        <Link href="/register">
                            Become a member
                            <ChevronRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-visible lg:mr-10">
                <img
                    src="/home/globe.png"
                    alt="Global network"
                    className="w-[90%] max-w-none object-contain lg:w-[120%]"
                />
            </div>
        </div>
    );
}
