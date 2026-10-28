import { useEffect, useState } from 'react';
import { Languages, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Language = {
    code: string;
    label: string;
    flag: string;
};

const LANGUAGES: Language[] = [
    { code: 'en', label: 'English', flag: '/uk-flag.png' },
    { code: 'hu', label: 'Magyar', flag: '/hungarian-flag.png' },
];

const STORAGE_KEY = 'app.locale';

/* =================================================================
 |  Flag image with loading state
 |
 |  Fills its parent (which owns the size + ring). Shows a small
 |  centered spinner and a `bg-muted` placeholder while the PNG
 |  downloads, then fades the flag in.
 | ================================================================= */

function FlagImage({ src, alt }: { src: string; alt: string }) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);

    // Reset if `src` changes (e.g. user switches language in the
    // trigger) so we don't show a stale state for the new image.
    useEffect(() => {
        setLoaded(false);
        setErrored(false);
    }, [src]);

    return (
        <span
            className={cn(
                'relative flex h-full w-full items-center justify-center overflow-hidden',
                !loaded && !errored && 'bg-muted',
            )}
        >
            {!loaded && !errored && (
                <Loader2 className="absolute size-2.5 animate-spin text-muted-foreground/60" />
            )}
            {errored && (
                <span className="absolute text-[9px] font-medium text-muted-foreground">
                    ?
                </span>
            )}
            <img
                src={src}
                alt={alt}
                className={cn(
                    'h-full w-full object-cover transition-opacity duration-200 ease-out',
                    loaded ? 'opacity-100' : 'opacity-0',
                )}
                draggable={false}
                onLoad={() => setLoaded(true)}
                onError={() => setErrored(true)}
            />
        </span>
    );
}

/* =================================================================
 |  Switcher
 | ================================================================= */

export function LanguageSwitcher() {
    const [locale, setLocale] = useState<string>('en');

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && LANGUAGES.some((l) => l.code === stored)) {
            setLocale(stored);
        }
    }, []);

    const change = (next: string) => {
        setLocale(next);
        window.localStorage.setItem(STORAGE_KEY, next);

        // When you wire up a real backend i18n solution later,
        // replace this with something like:
        //   router.post('/language', { locale: next });
        // or set a `locale` cookie server-side.
    };

    const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full"
                            aria-label={`Change language (currently ${current.label})`}
                        >
                            <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full ring-1 ring-border">
                                <FlagImage
                                    key={current.flag}
                                    src={current.flag}
                                    alt={current.label}
                                />
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Change language</TooltipContent>
            </Tooltip>

            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel className="flex items-center gap-2">
                    <Languages className="h-3.5 w-3.5 opacity-70" />
                    Language
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => change(lang.code)}
                        className="flex items-center gap-2"
                    >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-border">
                            <FlagImage src={lang.flag} alt="" />
                        </span>
                        <span className="flex-1">{lang.label}</span>
                        {locale === lang.code && (
                            <Check className="h-4 w-4 opacity-70" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}