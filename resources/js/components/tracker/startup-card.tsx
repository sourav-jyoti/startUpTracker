import { router } from '@inertiajs/react';
import { Bookmark, BookmarkCheck, Rocket, ChevronUp } from 'lucide-react';
import type { Startup } from '@/types';
import bookmarks from '@/routes/bookmarks';
import upvotes from '@/routes/upvotes';

interface StartupCardProps {
    startup: Startup;
    onSelect?: (startup: Startup) => void;
}

/**
 * Format a funding amount to a human-readable string.
 * e.g. 4200000 -> "$4.2M", 820000 -> "$820K"
 */
export function formatFunding(amount: string | number): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (num >= 1_000_000_000) {
        return `$${(num / 1_000_000_000).toFixed(1)}B`;
    }

    if (num >= 1_000_000) {
        return `$${(num / 1_000_000).toFixed(1)}M`;
    }

    if (num >= 1_000) {
        return `$${(num / 1_000).toFixed(0)}K`;
    }

    return `$${num}`;
}

/**
 * Format funding stage to display string.
 * e.g. "series-a" -> "SERIES A"
 */
export function formatStage(stage: string): string {
    if (!stage) return 'N/A';
    return stage.replace(/-/g, ' ').toUpperCase();
}

export default function StartupCard({ startup, onSelect }: StartupCardProps) {
    const toggleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.post(bookmarks.toggle.url({ startup: startup.id }), {}, {
            preserveScroll: true,
        });
    };

    const toggleUpvote = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.post(upvotes.toggle.url({ startup: startup.id }), {}, {
            preserveScroll: true,
        });
    };

    return (
        <div
            className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/5 transition-all group cursor-pointer relative flex flex-col h-full"
            onClick={() => {
                if (onSelect) {
                    onSelect(startup);
                } else {
                    router.get(`/startups/${startup.slug}`);
                }
            }}
        >
            <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-surface-container rounded-2xl overflow-hidden flex items-center justify-center border border-outline-variant/30 flex-shrink-0 shadow-inner group-hover:bg-primary/5 transition-colors">
                    {startup.logo_url ? (
                        <img
                            src={startup.logo_url}
                            alt={startup.name}
                            className="w-12 h-12 object-contain"
                        />
                    ) : (
                        <Rocket className="w-8 h-8 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className={`transition-all flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-body-sm font-bold active:scale-95 border cursor-pointer ${
                            startup.is_upvoted
                                ? 'text-white bg-primary hover:bg-primary/90 border-primary shadow-sm shadow-primary/20'
                                : 'text-on-surface bg-surface hover:bg-surface-container-high border-outline-variant hover:border-outline-variant/80'
                        }`}
                        onClick={toggleUpvote}
                    >
                        <ChevronUp className={`w-4 h-4 transition-transform group-hover/upvote:-translate-y-0.5 ${startup.is_upvoted ? 'stroke-[3px]' : ''}`} />
                        <span>{startup.upvotes_count ?? 0}</span>
                    </button>
                    <button
                        className={`transition-all flex-shrink-0 p-2.5 rounded-xl hover:bg-surface-container-high active:scale-90 border cursor-pointer ${
                            startup.is_bookmarked ? 'text-primary bg-primary/10 border-primary/20' : 'text-on-surface-variant bg-surface-container border-transparent'
                        }`}
                        onClick={toggleBookmark}
                    >
                        {startup.is_bookmarked ? (
                            <BookmarkCheck className="w-5 h-5 fill-current" />
                        ) : (
                            <Bookmark className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1">
                <h3 className="text-title-base font-bold mb-2 group-hover:text-primary transition-colors">
                    {startup.name}
                </h3>
                <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
                    {startup.description}
                </p>
                {startup.competition && (
                    <div className="flex items-center gap-1.5 mb-6">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                            emoji_events
                        </span>
                        <span className="text-[11px] font-bold text-primary/80 uppercase tracking-wider">
                            {startup.competition}
                        </span>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-label-caps font-mono font-bold text-primary text-[10px] tracking-tight">
                        {formatStage(startup.funding_stage)}
                    </span>
                    <span className="text-title-sm font-mono font-bold">
                        {formatFunding(startup.funding_amount)}
                    </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-label-caps font-mono font-bold opacity-30 text-[8px]">CATEGORY</span>
                    <span className="text-body-xs font-bold uppercase tracking-tighter">
                        {startup.sector}
                    </span>
                </div>
            </div>
        </div>
    );
}
