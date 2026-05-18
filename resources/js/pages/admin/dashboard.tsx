import { Head, router, Link } from '@inertiajs/react';
import { 
    ShieldCheck, 
    Rocket, 
    Star, 
    Trash2, 
    ExternalLink,
    Edit,
    UserPlus,
    CheckCircle2,
    XCircle,
    LayoutDashboard,
    Users,
    Activity
} from 'lucide-react';
import { formatFunding } from '@/components/tracker/startup-card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import startupRoutes from '@/routes/startups';
import type { Startup } from '@/types';

interface AdminDashboardProps {
    startups: {
        data: Startup[];
        links: any[];
    };
    stats: {
        total_startups: number;
        featured_startups: number;
        pending_review: number;
    };
}

export default function AdminDashboard({ startups, stats }: AdminDashboardProps) {
    const breadcrumbs = [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Dashboard', href: '/admin/dashboard' },
    ];

    const toggleFeatured = (id: number) => {
        router.post(admin.startups.toggleFeatured.url({ startup: id }), {}, {
            preserveScroll: true,
        });
    };

    const deleteStartup = (id: number) => {
        if (confirm('Are you sure you want to delete this startup? This action cannot be undone.')) {
            router.delete(admin.startups.destroy.url({ startup: id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="w-full px-4 md:px-6 py-10">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-display-sm font-bold flex items-center gap-3">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                            Administrative Console
                        </h1>
                        <p className="text-body-base text-on-surface-variant">Review and manage platform submissions.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/users"
                            className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface px-4 py-2 rounded-xl font-bold hover:bg-surface-container transition-colors"
                        >
                            <Users className="w-5 h-5" />
                            Manage Users
                        </Link>
                        <Link
                            href="/admin/startups/create"
                            className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                        >
                            <Rocket className="w-5 h-5" />
                            Add Startup
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <AdminStatCard 
                        title="Total Startups" 
                        value={stats.total_startups} 
                        icon={<Rocket className="w-6 h-6 text-primary" />}
                        color="bg-primary/10"
                    />
                    <AdminStatCard 
                        title="Featured" 
                        value={stats.featured_startups} 
                        icon={<Star className="w-6 h-6 text-amber-500" />}
                        color="bg-amber-500/10"
                    />
                    <AdminStatCard 
                        title="Pending Review" 
                        value={stats.pending_review} 
                        icon={<Activity className="w-6 h-6 text-indigo-500" />}
                        color="bg-indigo-500/10"
                    />
                </div>

                {/* Submissions Table */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                        <h3 className="text-title-md font-bold">Startup Submissions</h3>
                        <div className="flex items-center gap-2 text-label-caps font-mono font-bold opacity-50">
                            <LayoutDashboard className="w-4 h-4" />
                            LATEST FIRST
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container/50">
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Startup</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Founder</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Stage/Funding</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Status</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/30">
                                {startups.data.map((startup) => (
                                    <tr key={startup.id} className="hover:bg-surface-container/30 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant overflow-hidden">
                                                    {startup.logo_url ? (
                                                        <img src={startup.logo_url} alt="" className="w-full h-full object-contain" />
                                                    ) : (
                                                        <Rocket className="w-5 h-5 text-on-surface-variant opacity-30" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-body-sm">{startup.name}</p>
                                                    <p className="text-[10px] text-on-surface-variant uppercase font-mono">{startup.sector}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[10px] font-bold">
                                                    {startup.user?.name ? startup.user.name.charAt(0) : '?'}
                                                </div>
                                                <span className="text-body-sm">{startup.user?.name || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="text-body-sm font-bold text-primary">{formatFunding(startup.total_funding)}</p>
                                                <p className="text-[10px] text-on-surface-variant font-mono uppercase">{startup.funding_stage}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {startup.is_featured ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold border border-amber-500/20">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    FEATURED
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
                                                    REGULAR
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => toggleFeatured(startup.id)}
                                                    className={`p-2 rounded-lg transition-all ${
                                                        startup.is_featured 
                                                        ? 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20' 
                                                        : 'text-on-surface-variant hover:bg-surface-container-high'
                                                    }`}
                                                    title={startup.is_featured ? "Remove from Featured" : "Mark as Featured"}
                                                >
                                                    <Star className={`w-4 h-4 ${startup.is_featured ? 'fill-current' : ''}`} />
                                                </button>
                                                <Link 
                                                    href={startupRoutes.show.url({ startup: startup.slug })}
                                                    className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => deleteStartup(startup.id)}
                                                    className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function AdminStatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl shadow-sm flex items-center justify-between">
            <div>
                <p className="text-label-caps font-mono font-bold opacity-40 mb-2">{title}</p>
                <p className="text-display-xs font-bold">{value}</p>
            </div>
            <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-inner`}>
                {icon}
            </div>
        </div>
    );
}
