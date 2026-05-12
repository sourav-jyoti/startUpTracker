import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, 
    Rocket, 
    Star, 
    Bookmark, 
    BarChart3, 
    Plus, 
    LayoutDashboard,
    Clock,
    Zap,
    Users,
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
import AppLayout from '@/layouts/app-layout';
import StartupCard from '@/components/tracker/startup-card';
import { formatFunding } from '@/components/tracker/startup-card';
import type { Startup } from '@/types';

interface DashboardProps {
    stats: {
        total_submissions: number;
        total_funding: number;
        featured_count: number;
        watchlist_count: number;
    };
    startups: Startup[];
    bookmarkedStartups: Startup[];
    charts: {
        fundingTrends: any[];
        sectorBreakdown: any[];
    };
}

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6'];

export default function Dashboard({ stats, startups, bookmarkedStartups, charts }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<'submissions' | 'watchlist' | 'analytics'>('submissions');

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Dashboard" />

            <div className="w-full px-4 md:px-6 py-8">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 md:p-12 mb-12 shadow-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full -ml-24 -mb-24 blur-3xl" />
                    
                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold text-label-caps mb-4 tracking-widest">
                                <Zap className="w-4 h-4" />
                                OVERVIEW
                            </div>
                            <h1 className="text-display-md md:text-display-lg font-bold text-on-surface mb-2">
                                Welcome back, Founder
                            </h1>
                            <p className="text-body-lg text-on-surface-variant max-w-xl">
                                Your startup portfolio is growing. You've secured <span className="text-primary font-bold">{formatFunding(stats.total_funding)}</span> in tracked funding across all submissions.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => window.location.href = route('startups.create')}
                                className="group bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                            >
                                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                                Submit Startup
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard 
                        title="My Submissions" 
                        value={stats.total_submissions} 
                        icon={<Rocket className="w-6 h-6 text-primary" />} 
                        subtitle="Startups listed"
                        trend="+12%"
                        color="bg-primary/10"
                        borderColor="border-l-primary"
                    />
                    <StatCard 
                        title="Total Value" 
                        value={formatFunding(stats.total_funding)} 
                        icon={<TrendingUp className="w-6 h-6 text-emerald-500" />} 
                        subtitle="Aggregate funding"
                        trend="+24%"
                        color="bg-emerald-500/10"
                        borderColor="border-l-emerald-500"
                    />
                    <StatCard 
                        title="Featured" 
                        value={stats.featured_count} 
                        icon={<Star className="w-6 h-6 text-amber-500" />} 
                        subtitle="Premium status"
                        color="bg-amber-500/10"
                        borderColor="border-l-amber-500"
                    />
                    <StatCard 
                        title="Watchlist" 
                        value={stats.watchlist_count} 
                        icon={<Bookmark className="w-6 h-6 text-indigo-500" />} 
                        subtitle="Saved for later"
                        color="bg-indigo-500/10"
                        borderColor="border-l-indigo-500"
                    />
                </div>

                {/* Tabs with Glassmorphism */}
                <div className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md mb-8 py-2">
                    <div className="flex items-center gap-2 p-1.5 bg-surface-container rounded-2xl border border-outline-variant w-fit">
                        <TabButton 
                            active={activeTab === 'submissions'} 
                            onClick={() => setActiveTab('submissions')}
                            label="Submissions"
                            icon={<LayoutDashboard className="w-4 h-4" />}
                        />
                        <TabButton 
                            active={activeTab === 'watchlist'} 
                            onClick={() => setActiveTab('watchlist')}
                            label="Watchlist"
                            icon={<Bookmark className="w-4 h-4" />}
                        />
                        <TabButton 
                            active={activeTab === 'analytics'} 
                            onClick={() => setActiveTab('analytics')}
                            label="Analytics"
                            icon={<BarChart3 className="w-4 h-4" />}
                        />
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {activeTab === 'submissions' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {startups.length > 0 ? (
                                    startups.map((startup) => (
                                        <StartupCard key={startup.id} startup={startup} />
                                    ))
                                ) : (
                                    <EmptyState 
                                        icon={<Rocket className="w-16 h-16" />}
                                        title="No active submissions"
                                        description="You haven't submitted any startups yet. Join the ecosystem today."
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'watchlist' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {bookmarkedStartups.length > 0 ? (
                                    bookmarkedStartups.map((startup) => (
                                        <StartupCard key={startup.id} startup={startup} />
                                    ))
                                ) : (
                                    <EmptyState 
                                        icon={<Bookmark className="w-16 h-16" />}
                                        title="Your Watchlist is empty"
                                        description="Save startups you're interested in to track their progress here."
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-title-lg font-bold flex items-center gap-2">
                                                <TrendingUp className="w-6 h-6 text-primary" />
                                                Funding Velocity
                                            </h3>
                                            <p className="text-body-sm text-on-surface-variant">Cumulative investment over time</p>
                                        </div>
                                        <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20 tracking-tighter">LIVE DATA</div>
                                    </div>
                                    <div className="h-[350px]">
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
                                                    tick={{ fontSize: 10, fill: '#666' }} 
                                                    dy={10}
                                                />
                                                <YAxis 
                                                    axisLine={false} 
                                                    tickLine={false} 
                                                    tick={{ fontSize: 10, fill: '#666' }}
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
                                                    animationDuration={1500}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl shadow-sm">
                                    <h3 className="text-title-lg font-bold mb-8 flex items-center gap-2">
                                        <BarChart3 className="w-6 h-6 text-emerald-500" />
                                        Sector Mix
                                    </h3>
                                    <div className="h-[250px] relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={charts.sectorBreakdown}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={70}
                                                    outerRadius={95}
                                                    paddingAngle={8}
                                                    dataKey="count"
                                                    animationBegin={500}
                                                    animationDuration={1000}
                                                >
                                                    {charts.sectorBreakdown.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <span className="text-display-xs font-bold text-on-surface">{charts.sectorBreakdown.length}</span>
                                            <span className="text-label-caps opacity-50 font-bold text-[8px]">SECTORS</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mt-8">
                                        {charts.sectorBreakdown.map((entry, index) => (
                                            <div key={entry.name} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                    <span className="text-body-sm font-semibold text-on-surface/80 group-hover:text-on-surface transition-colors">{entry.name}</span>
                                                </div>
                                                <span className="text-label-caps font-mono font-bold opacity-40">{entry.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Footer Tip */}
                <div className="mt-20 p-6 rounded-2xl bg-surface-container border border-outline-variant flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-body-sm font-semibold">Pro Tip: Use Cmd + K to quickly search any startup across the entire platform.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, icon, subtitle, trend, color, borderColor }: { title: string, value: string | number, icon: React.ReactNode, subtitle: string, trend?: string, color: string, borderColor: string }) {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            className={`bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex flex-col gap-4 shadow-sm border-l-4 ${borderColor} transition-all`}
        >
            <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    {icon}
                </div>
                {trend && (
                    <div className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-bold rounded-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {trend}
                    </div>
                )}
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

function TabButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 py-2.5 px-6 rounded-xl transition-all relative ${
                active 
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
        >
            {icon}
            <span className="text-body-sm">{label}</span>
            {active && (
                <motion.div 
                    layoutId="activeTabPill"
                    className="absolute inset-0 border border-outline-variant rounded-xl pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
        </button>
    );
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="col-span-full py-24 flex flex-col items-center text-center bg-surface-container/30 rounded-3xl border-2 border-dashed border-outline-variant">
            <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6 text-on-surface-variant/40 shadow-inner">
                {icon}
            </div>
            <h3 className="text-display-xs font-bold mb-3">{title}</h3>
            <p className="text-body-lg text-on-surface-variant max-w-sm mb-8">
                {description}
            </p>
            <button 
                onClick={() => window.location.href = route('startups.create')}
                className="flex items-center gap-2 text-primary font-bold hover:underline"
            >
                <Plus className="w-5 h-5" />
                Submit your first startup
            </button>
        </div>
    );
}
