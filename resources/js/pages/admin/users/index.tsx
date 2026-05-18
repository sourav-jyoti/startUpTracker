import { Head, router, Link } from '@inertiajs/react';
import { 
    Users, 
    Trash2, 
    Edit, 
    UserPlus,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

interface AdminUsersIndexProps {
    users: {
        data: User[];
        links: any[];
    };
}

export default function AdminUsersIndex({ users }: AdminUsersIndexProps) {
    const breadcrumbs = [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Users', href: '/admin/users' },
    ];

    const deleteUser = (id: number) => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            router.delete(`/admin/users/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />

            <div className="w-full px-4 md:px-6 py-10">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-display-sm font-bold flex items-center gap-3">
                            <Users className="w-10 h-10 text-primary" />
                            User Management
                        </h1>
                        <p className="text-body-base text-on-surface-variant">Manage platform users and administrators.</p>
                    </div>
                    <Link
                        href="/admin/users/create"
                        className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add User
                    </Link>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                        <h3 className="text-title-md font-bold">All Users</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container/50">
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Name</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Email</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Role</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60">Joined</th>
                                    <th className="p-4 text-label-caps font-mono font-bold opacity-60 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/30">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-surface-container/30 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <p className="font-bold text-body-sm">{user.name}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-body-sm text-on-surface-variant">{user.email}</p>
                                        </td>
                                        <td className="p-4">
                                            {user.is_admin ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                                                    <ShieldCheck className="w-3 h-3 fill-current" />
                                                    ADMIN
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
                                                    USER
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <p className="text-body-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="p-2 text-on-surface-variant hover:bg-surface-container-high hover:text-primary rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => deleteUser(user.id)}
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
