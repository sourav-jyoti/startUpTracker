import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import FundingTrendCard from '@/components/tracker/funding-trend-card';
import StartupCard, { formatFunding } from '@/components/tracker/startup-card';
import StartupDetailModal from '@/components/tracker/startup-detail-modal';
import WeekSelector from '@/components/tracker/week-selector';
import TrackerLayout from '@/layouts/tracker-layout';
import type { Startup } from '@/types';

interface Props {
    startups: Startup[];
    trendingByFunding: Startup[];
    topByUpvote: Startup[];
    currentWeek: number | 'all';
    currentYear: number;
    weeks: number[];
}

export default function StartupsIndex({
    startups,
    trendingByFunding,
    topByUpvote,
    currentWeek,
    weeks,
}: Props) {
    const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

    function handleSelectStartup(startup: Startup) {
        router.get(`/startups/${startup.slug}`, {}, {
            preserveState: true, preserveScroll: true, only: ['startup'],
            onSuccess: (page) => {
                const data = page.props as unknown as { startup: Startup };
                setSelectedStartup(data.startup);
            },
            onError: () => setSelectedStartup(startup),
        });
    }

    return (
        <>
            <Head title="Startup Tracker - Venture Insights" />
            <section className="flex-1 p-8 overflow-y-auto">
                <WeekSelector weeks={weeks} currentWeek={currentWeek} title="Timeline Coverage" />
                <div className="space-y-4">
                    {startups.length === 0 && (
                        <div className="text-center py-16 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[48px] mb-4 block opacity-30">search_off</span>
                            <p className="text-title-sm font-semibold mb-1">No startups found</p>
                            <p className="text-body-sm">Try selecting a different week or clearing filters.</p>
                        </div>
                    )}
                    {startups.map((startup) => (
                        <StartupCard key={startup.id} startup={startup} onSelect={handleSelectStartup} />
                    ))}
                </div>
            </section>
            <aside className="w-[400px] p-10 bg-surface-container-low/50 border-l border-outline-variant flex-shrink-0 overflow-y-auto custom-scrollbar hidden xl:block">
                <FundingTrendCard />
                
                <div className="mb-8">
                    <h3 className="text-title-sm font-semibold mb-4">Trending by Funding</h3>
                    <div className="space-y-3">
                        {trendingByFunding.map(startup => (
                            <div key={startup.id} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline-variant cursor-pointer hover:border-primary transition-colors" onClick={() => handleSelectStartup(startup)}>
                                <div>
                                    <h4 className="font-semibold text-sm">{startup.name}</h4>
                                    <p className="text-xs text-on-surface-variant">{startup.sector}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-primary">{formatFunding(startup.funding_amount)}</p>
                                    <p className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">{startup.funding_stage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-title-sm font-semibold mb-4">Top by Upvotes</h3>
                    <div className="space-y-3">
                        {topByUpvote.map(startup => (
                            <div key={startup.id} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline-variant cursor-pointer hover:border-primary transition-colors" onClick={() => handleSelectStartup(startup)}>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[16px] -mb-1">arrow_drop_up</span>
                                        <span className="text-xs font-bold leading-none">{startup.upvotes_count || 0}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">{startup.name}</h4>
                                        <p className="text-xs text-on-surface-variant">{startup.sector}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
            {selectedStartup && (
                <StartupDetailModal startup={selectedStartup} onClose={() => setSelectedStartup(null)} />
            )}
        </>
    );
}

StartupsIndex.layout = (page: React.ReactNode) => (
    <TrackerLayout>{page}</TrackerLayout>
);
