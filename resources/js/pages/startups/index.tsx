import { Head, router, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, 
    Rocket, 
    Star, 
    Bookmark, 
    BarChart3, 
    Plus, 
    Zap,
    ShieldCheck
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
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
    userStartups?: Startup[];
    bookmarkedStartups?: Startup[];
    stats?: {
        total_submissions: number;
        total_submissions_title?: string;
        total_submissions_subtitle?: string;
        total_funding: number;
        total_funding_title?: string;
        total_funding_subtitle?: string;
        featured_count: number;
        featured_title?: string;
        featured_subtitle?: string;
        watchlist_count: number;
        watchlist_title?: string;
        watchlist_subtitle?: string;
    };
    charts?: {
        fundingTrends: any[];
        sectorBreakdown: any[];
    };
}

export default function StartupsIndex({
    startups,
    trendingByFunding,
    topByUpvote,
    currentWeek,
    weeks,
    userStartups = [],
    bookmarkedStartups = [],
    stats,
    charts,
}: Props) {
    const { url, props } = usePage();
    const user = (props.auth as any)?.user ?? null;
    const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
    const [activeTab, setActiveTab] = useState<'explore' | 'submissions' | 'watchlist' | 'analytics'>('explore');

    const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6'];

    useEffect(() => {
        const search = url.includes('?') ? url.split('?')[1] : '';
        const params = new URLSearchParams(search);
        const tab = params.get('tab');
        if (tab === 'explore' || tab === 'submissions' || tab === 'watchlist' || tab === 'analytics') {
            setActiveTab(tab as any);
        } else {
            setActiveTab('explore');
        }
    }, [url]);

    const handleTabChange = (tab: 'explore' | 'submissions' | 'watchlist' | 'analytics') => {
        router.visit(tab === 'explore' ? '/' : `/?tab=${tab}`, {
            preserveState: true,
            preserveScroll: true
        });
    };

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
                {activeTab === 'explore' && (
                    <div className="mb-8">
                        <WeekSelector weeks={weeks} currentWeek={currentWeek} title="Timeline" />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        {activeTab === 'explore' && (
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
                        )}

                        {activeTab === 'submissions' && (
                            <div className="space-y-6">
                                {stats && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <StatCard 
                                            title={stats.total_submissions_title || "My Submissions"} 
                                            value={stats.total_submissions} 
                                            icon={<Rocket className="w-5 h-5 text-primary" />} 
                                            subtitle={stats.total_submissions_subtitle || "Startups listed"}
                                            color="bg-primary/10"
                                            borderColor="border-l-primary"
                                        />
                                        <StatCard 
                                            title={stats.total_funding_title || "Total Value"} 
                                            value={formatFunding(stats.total_funding)} 
                                            icon={<TrendingUp className="w-5 h-5 text-emerald-500" />} 
                                            subtitle={stats.total_funding_subtitle || "Aggregate funding"}
                                            color="bg-emerald-500/10"
                                            borderColor="border-l-emerald-500"
                                        />
                                        <StatCard 
                                            title={stats.featured_title || "Featured"} 
                                            value={stats.featured_count} 
                                            icon={<Star className="w-5 h-5 text-amber-500" />} 
                                            subtitle={stats.featured_subtitle || "Premium status"}
                                            color="bg-amber-500/10"
                                            borderColor="border-l-amber-500"
                                        />
                                        <StatCard 
                                            title={stats.watchlist_title || "Watchlist"} 
                                            value={stats.watchlist_count} 
                                            icon={<Bookmark className="w-5 h-5 text-indigo-500" />} 
                                            subtitle={stats.watchlist_subtitle || "Saved for later"}
                                            color="bg-indigo-500/10"
                                            borderColor="border-l-indigo-500"
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {userStartups.length > 0 ? (
                                        userStartups.map((startup) => (
                                            <StartupCard key={startup.id} startup={startup} onSelect={handleSelectStartup} />
                                        ))
                                    ) : (
                                        <EmptyState 
                                            icon={<Rocket className="w-10 h-10 text-primary" />}
                                            title="No active submissions"
                                            description="You haven't submitted any startups yet. Join the ecosystem today."
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'watchlist' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {bookmarkedStartups.length > 0 ? (
                                        bookmarkedStartups.map((startup) => (
                                            <StartupCard key={startup.id} startup={startup} onSelect={handleSelectStartup} />
                                        ))
                                    ) : (
                                        <EmptyState 
                                            icon={<Bookmark className="w-10 h-10 text-indigo-500" />}
                                            title="Your Watchlist is empty"
                                            description="Save startups you're interested in to track their progress here."
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && charts && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-3xl shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-title-sm font-bold flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5 text-primary" />
                                                    Funding Velocity
                                                </h3>
                                                <p className="text-body-xs text-on-surface-variant">Cumulative investment over time</p>
                                            </div>
                                            <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20 tracking-tighter">LIVE DATA</div>
                                        </div>
                                        <div className="h-[280px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={charts.fundingTrends}>
                                                    <defs>
                                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" opacity={0.5} />
                                                    <XAxis 
                                                        dataKey="date" 
                                                        axisLine={false} 
                                                        tickLine={false} 
                                                        tick={{ fontSize: 9, fill: '#666' }} 
                                                        dy={10}
                                                    />
                                                    <YAxis 
                                                        axisLine={false} 
                                                        tickLine={false} 
                                                        tick={{ fontSize: 9, fill: '#666' }}
                                                        tickFormatter={(value) => `$${value/1000}k`}
                                                    />
                                                    <Tooltip 
                                                        contentStyle={{ 
                                                            borderRadius: '16px', 
                                                            border: '1px solid rgba(0,0,0,0.05)', 
                                                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                                                            padding: '12px'
                                                        }}
                                                        formatter={(value: any) => [formatFunding(value), "Funding"]}
                                                    />
                                                    <Area 
                                                        type="monotone" 
                                                        dataKey="amount" 
                                                        stroke="#6366f1" 
                                                        strokeWidth={3}
                                                        fillOpacity={1} 
                                                        fill="url(#colorAmount)" 
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-3xl shadow-sm">
                                        <h3 className="text-title-sm font-bold mb-6 flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-emerald-500" />
                                            Sector Mix
                                        </h3>
                                        <div className="h-[180px] relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={charts.sectorBreakdown}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={50}
                                                        outerRadius={75}
                                                        paddingAngle={8}
                                                        cornerRadius={4}
                                                        dataKey="count"
                                                    >
                                                        {charts.sectorBreakdown.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip 
                                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                <span className="text-title-md font-bold text-on-surface">{charts.sectorBreakdown.length}</span>
                                                <span className="text-[8px] font-bold opacity-50 uppercase tracking-wider">SECTORS</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mt-4 max-h-[120px] overflow-y-auto custom-scrollbar">
                                            {charts.sectorBreakdown.map((entry, index) => (
                                                <div key={entry.name} className="flex items-center justify-between group">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                        <span className="text-body-xs font-semibold text-on-surface/80 group-hover:text-on-surface transition-colors">{entry.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-mono font-bold opacity-40">{entry.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    <p className="text-body-xs font-semibold">Pro Tip: Use Cmd + K to quickly search any startup across the entire platform.</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* Right sidebar shown ONLY on Explore view to keep clean visual structure and full charts space */}
            {activeTab === 'explore' && (
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
            )}

            {selectedStartup && (
                <StartupDetailModal startup={selectedStartup} onClose={() => setSelectedStartup(null)} />
            )}
        </>
    );
}

function StatCard({ title, value, icon, subtitle, color, borderColor }: { title: string, value: string | number, icon: React.ReactNode, subtitle: string, color: string, borderColor: string }) {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            className={`bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col gap-4 shadow-sm border-l-4 ${borderColor} transition-all`}
        >
            <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-label-caps font-mono font-bold opacity-40 text-[10px] mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-headline-md font-bold tracking-tight">{value}</p>
                </div>
                <p className="text-body-xs text-on-surface-variant font-medium mt-1">{subtitle}</p>
            </div>
        </motion.div>
    );
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="col-span-full py-16 flex flex-col items-center text-center bg-surface-container/30 rounded-3xl border border-dashed border-outline-variant">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4 text-on-surface-variant/40 shadow-inner">
                {icon}
            </div>
            <h3 className="text-title-sm font-bold mb-2">{title}</h3>
            <p className="text-body-sm text-on-surface-variant max-w-sm mb-6">
                {description}
            </p>
            <Link 
                href="/startups/create"
                className="flex items-center gap-2 text-primary font-bold hover:underline"
            >
                <Plus className="w-5 h-5" />
                Submit your first startup
            </Link>
        </div>
    );
}

StartupsIndex.layout = (page: React.ReactNode) => (
    <TrackerLayout>{page}</TrackerLayout>
);
