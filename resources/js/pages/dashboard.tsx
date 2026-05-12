import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import type { Startup } from '@/types';
import { formatFunding } from '@/components/tracker/startup-card';

interface Props {
    startups: Startup[];
    stats: {
        total_submissions: number;
        total_funding_managed: number;
        featured_startups: number;
    };
}

export default function Dashboard({ startups = [], stats }: Props) {
    const {
        total_submissions = 0,
        total_funding_managed = 0,
        featured_startups = 0,
    } = stats || {};

    return (
        <>
            <Head title="User Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 p-8 max-w-6xl mx-auto w-full">
                {/* Stats Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6">
                        <p className="text-label-caps font-mono font-bold text-on-surface-variant mb-2">Submissions</p>
                        <h2 className="text-display-sm font-bold">{total_submissions}</h2>
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6">
                        <p className="text-label-caps font-mono font-bold text-on-surface-variant mb-2">Total Funding</p>
                        <h2 className="text-display-sm font-bold">{formatFunding(total_funding_managed)}</h2>
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6">
                        <p className="text-label-caps font-mono font-bold text-on-surface-variant mb-2">Featured</p>
                        <h2 className="text-display-sm font-bold">{featured_startups}</h2>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-title-lg font-bold">Your Submissions</h3>
                        <Link
                            href="/startups/create"
                            className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-body-sm font-mono font-bold uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95"
                        >
                            Submit New Startup
                        </Link>
                    </div>

                    {startups.length === 0 ? (
                        <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-2xl py-20 text-center">
                            <span className="material-symbols-outlined text-on-surface-variant text-[48px] mb-4 opacity-30">rocket</span>
                            <p className="text-title-sm font-semibold">No startups submitted yet</p>
                            <p className="text-body-sm text-on-surface-variant mb-6">Start tracking your ventures today!</p>
                        </div>
                    ) : (
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-surface-container-low border-b border-outline-variant">
                                    <tr>
                                        <th className="px-6 py-4 text-label-caps font-mono font-bold text-on-surface-variant">Startup</th>
                                        <th className="px-6 py-4 text-label-caps font-mono font-bold text-on-surface-variant">Stage</th>
                                        <th className="px-6 py-4 text-label-caps font-mono font-bold text-on-surface-variant">Funding</th>
                                        <th className="px-6 py-4 text-label-caps font-mono font-bold text-on-surface-variant">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                    {startups.map((startup) => (
                                        <tr key={startup.id} className="hover:bg-surface-container-high transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center border border-outline-variant/30">
                                                        {startup.logo_url ? (
                                                            <img src={startup.logo_url} className="w-6 h-6 object-contain" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">rocket_launch</span>
                                                        )}
                                                    </div>
                                                    <span className="font-semibold">{startup.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-body-sm bg-surface-container px-2 py-1 rounded font-mono uppercase text-[10px] font-bold">
                                                    {startup.funding_stage}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="font-mono text-body-sm font-bold text-secondary">
                                                    {formatFunding(startup.funding_amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                {startup.is_featured ? (
                                                    <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
                                                        <span className="material-symbols-outlined text-[14px]">verified</span>
                                                        FEATURED
                                                    </span>
                                                ) : (
                                                    <span className="text-[11px] font-bold text-on-surface-variant/50">PENDING</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link href={`/startups/${startup.id}`} className="text-on-surface-variant hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
