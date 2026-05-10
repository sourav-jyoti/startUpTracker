import { router, usePage } from '@inertiajs/react';

interface WeekSelectorProps {
    weeks: number[];
    currentWeek: number;
    title?: string;
}

export default function WeekSelector({
    weeks,
    currentWeek,
    title = 'Timeline Coverage',
}: WeekSelectorProps) {
    const { url } = usePage();

    function navigateToWeek(week: number) {
        const basePath = url.split('?')[0] || '/';
        const params = new URLSearchParams(window.location.search);
        params.set('week', String(week));
        router.get(`${basePath}?${params.toString()}`, {}, {
            preserveState: false,
            preserveScroll: true,
        });
    }

    function handleShift(direction: -1 | 1) {
        const target = currentWeek + direction;

        if (target >= 1 && target <= 52) {
            navigateToWeek(target);
        }
    }

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-title-sm font-semibold">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleShift(-1)}
                        disabled={currentWeek <= 1}
                        className="p-1 hover:bg-surface-container-high rounded-full transition-colors disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                        onClick={() => handleShift(1)}
                        disabled={currentWeek >= 52}
                        className="p-1 hover:bg-surface-container-high rounded-full transition-colors disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar whitespace-nowrap border-b border-outline-variant/30">
                {weeks.map((week) => (
                    <button
                        key={week}
                        onClick={() => navigateToWeek(week)}
                        className={`flex-shrink-0 px-6 py-2 text-label-caps font-mono font-bold uppercase transition-colors cursor-pointer ${
                            week === currentWeek
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-on-surface-variant/60 hover:text-primary hover:border-b-2 hover:border-outline-variant'
                        }`}
                    >
                        WEEK {String(week).padStart(2, '0')}
                    </button>
                ))}
            </div>
        </div>
    );
}
