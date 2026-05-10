import type { Startup } from '@/types';

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
    return stage.replace(/-/g, ' ').toUpperCase();
}

export default function StartupCard({ startup, onSelect }: StartupCardProps) {
    return (
        <div
            className="bg-surface-container-lowest border border-outline-variant p-5 rounded-lg hover:shadow-sm transition-all group cursor-pointer"
            onClick={() => onSelect?.(startup)}
        >
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    {/* Logo */}
                    <div className="w-14 h-14 bg-surface-container-high rounded-lg overflow-hidden flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                        {startup.logo_url ? (
                            <img
                                src={startup.logo_url}
                                alt={startup.name}
                                className="w-10 h-10 object-contain"
                            />
                        ) : (
                            <span className="material-symbols-outlined text-on-surface-variant text-[28px]">
                                rocket_launch
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="text-title-sm font-semibold mb-1">
                            {startup.name}
                        </h3>
                        <p className="text-body-sm text-on-surface-variant mb-3">
                            {startup.description}
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="text-secondary font-mono text-data-point font-bold">
                                {formatFunding(startup.funding_amount)}{' '}
                                {formatStage(startup.funding_stage)}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-outline-variant" />
                            <span className="text-label-caps font-mono font-bold text-on-surface-variant">
                                {startup.funding_label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bookmark */}
                <button
                    className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <span className="material-symbols-outlined">
                        bookmark_add
                    </span>
                </button>
            </div>
        </div>
    );
}
