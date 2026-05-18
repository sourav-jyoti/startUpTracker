import { Head, useForm, Link } from '@inertiajs/react';
import { UserCog, ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

export default function AdminUserEdit({ user }: { user: User }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        is_admin: user.is_admin,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    const breadcrumbs = [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Users', href: '/admin/users' },
        { title: 'Edit', href: `/admin/users/${user.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User - ${user.name}`} />

            <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-10">
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/admin/users" className="p-2 rounded-full hover:bg-surface-container transition-colors">
                        <ArrowLeft className="w-6 h-6 text-on-surface" />
                    </Link>
                    <div>
                        <h1 className="text-display-sm font-bold flex items-center gap-3">
                            <UserCog className="w-8 h-8 text-primary" />
                            Edit User: {user.name}
                        </h1>
                    </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-label-lg font-bold mb-2">Name</label>
                            <input 
                                type="text"
                                className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-label-lg font-bold mb-2">Email Address</label>
                            <input 
                                type="email"
                                className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
                        </div>
                        
                        <div className="pt-4 pb-2 border-t border-outline-variant/30">
                            <p className="text-label-caps font-mono font-bold opacity-50 mb-4">Change Password (Optional)</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-label-lg font-bold mb-2">New Password</label>
                                    <input 
                                        type="password"
                                        className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="Leave blank to keep current password"
                                    />
                                    {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-label-lg font-bold mb-2">Confirm New Password</label>
                                    <input 
                                        type="password"
                                        className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                            <input 
                                type="checkbox"
                                id="is_admin"
                                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                                checked={data.is_admin}
                                onChange={e => setData('is_admin', e.target.checked)}
                            />
                            <label htmlFor="is_admin" className="text-body-base font-bold">
                                Give this user Administrator access
                            </label>
                        </div>

                        <div className="pt-6 border-t border-outline-variant flex justify-end gap-4">
                            <Link 
                                href="/admin/users"
                                className="px-6 py-3 rounded-xl font-bold hover:bg-surface-container transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
