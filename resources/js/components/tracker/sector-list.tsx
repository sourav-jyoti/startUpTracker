import type { Sector } from '@/types';

interface SectorListProps {
    sectors: Sector[];
    variant?: 'card' | 'bar';
}

export default function SectorList({
    sectors,
    variant = 'card',
}: SectorListProps) {
    if (variant === 'bar') {
        return (
            <div className="space-y-4">
                <h3 className="text-label-caps font-mono font-bold text-on-surface-variant/60 border-b border-outline-variant pb-2">
                    Top Sectors
                </h3>
                {sectors.slice(0, 3).map((sector) => (
                    <div key={sector.id}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-body-sm font-semibold">
                                {sector.name}
                            </span>
                            <span className="font-mono text-body-sm">
                                {Math.round(parseFloat(sector.percentage))}%
                            </span>
                        </div>
                        <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-500"
                                style={{
                                    width: `${sector.percentage}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h4 className="text-label-caps font-mono font-bold text-on-surface-variant">
                Top Sectors
            </h4>
            {sectors.slice(0, 3).map((sector) => (
                <div
                    key={sector.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center justify-between group cursor-pointer hover:bg-surface-container-high transition-all"
                >
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">
                            {sector.icon}
                        </span>
                        <span className="text-body-sm font-semibold">
                            {sector.name}
                        </span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
                        chevron_right
                    </span>
                </div>
            ))}
        </div>
    );
}
