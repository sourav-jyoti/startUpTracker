import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import FundingTrendCard from '@/components/tracker/funding-trend-card';
import SectorList from '@/components/tracker/sector-list';
import StartupCard from '@/components/tracker/startup-card';
import StartupDetailModal from '@/components/tracker/startup-detail-modal';
import WeekSelector from '@/components/tracker/week-selector';
import TrackerLayout from '@/layouts/tracker-layout';
import type { Sector, Startup } from '@/types';

interface Props {
    startups: Startup[];
    sectors: Sector[];
    currentWeek: number | 'all';
    currentYear: number;
    weeks: number[];
}

export default function StartupsIndex({
    startups,
    sectors,
    currentWeek,
    weeks,
}: Props) {
    const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

    function handleSelectStartup(startup: Startup) {
        router.get(`/startups/${startup.id}`, {}, {
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
            <aside className="w-[320px] p-8 bg-surface-container-low/50 border-l border-outline-variant flex-shrink-0 overflow-y-auto custom-scrollbar hidden xl:block">
                <FundingTrendCard />
                <SectorList sectors={sectors} variant="card" />
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
