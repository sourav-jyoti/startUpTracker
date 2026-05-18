import { Head, useForm, Link } from '@inertiajs/react';
import { Rocket, ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function AdminStartupEdit({ startup }: { startup: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: startup.name || '',
        description: startup.description || '',
        mission: startup.mission || '',
        logo_url: startup.logo_url || '',
        funding_amount: startup.funding_amount || '',
        funding_stage: startup.funding_stage || '',
        sector: startup.sector || '',
        hq_location: startup.hq_location || '',
        website_url: startup.website_url || '',
        is_featured: startup.is_featured || false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/startups/${startup.id}`);
    };

    const breadcrumbs = [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Startups', href: '/admin/dashboard' },
        { title: 'Edit', href: `/admin/startups/${startup.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Startup - ${startup.name}`} />

            <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-10">
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/admin/dashboard" className="p-2 rounded-full hover:bg-surface-container transition-colors">
                        <ArrowLeft className="w-6 h-6 text-on-surface" />
                    </Link>
                    <div>
                        <h1 className="text-display-sm font-bold flex items-center gap-3">
                            <Rocket className="w-8 h-8 text-primary" />
                            Edit Startup: {startup.name}
                        </h1>
                    </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-label-lg font-bold mb-2">Startup Name *</label>
                                <input 
                                    type="text"
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-label-lg font-bold mb-2">Description *</label>
                                <textarea 
                                    rows={4}
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-label-lg font-bold mb-2">Mission</label>
                                <textarea 
                                    rows={2}
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.mission}
                                    onChange={e => setData('mission', e.target.value)}
                                ></textarea>
                                {errors.mission && <p className="text-error text-sm mt-1">{errors.mission}</p>}
                            </div>

                            <div>
                                <label className="block text-label-lg font-bold mb-2">Sector *</label>
                                <input 
                                    type="text"
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.sector}
                                    onChange={e => setData('sector', e.target.value)}
                                    placeholder="e.g. Fintech, EdTech, AI"
                                />
                                {errors.sector && <p className="text-error text-sm mt-1">{errors.sector}</p>}
                            </div>

                            <div>
                                <label className="block text-label-lg font-bold mb-2">HQ Location *</label>
                                <input 
                                    type="text"
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.hq_location}
                                    onChange={e => setData('hq_location', e.target.value)}
                                    placeholder="e.g. San Francisco, CA"
                                />
                                {errors.hq_location && <p className="text-error text-sm mt-1">{errors.hq_location}</p>}
                            </div>

                            <div>
                                <label className="block text-label-lg font-bold mb-2">Funding Stage *</label>
                                <select 
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.funding_stage}
                                    onChange={e => setData('funding_stage', e.target.value)}
                                >
                                    <option value="">Select a stage</option>
                                    <option value="Pre-seed">Pre-seed</option>
                                    <option value="Seed">Seed</option>
                                    <option value="Series A">Series A</option>
                                    <option value="Series B">Series B</option>
                                    <option value="Series C+">Series C+</option>
                                    <option value="Public">Public</option>
                                    <option value="Bootstrapped">Bootstrapped</option>
                                </select>
                                {errors.funding_stage && <p className="text-error text-sm mt-1">{errors.funding_stage}</p>}
                            </div>

                            <div>
                                <label className="block text-label-lg font-bold mb-2">Funding Amount (USD)</label>
                                <input 
                                    type="number"
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.funding_amount}
                                    onChange={e => setData('funding_amount', e.target.value)}
                                    placeholder="e.g. 5000000"
                                />
                                {errors.funding_amount && <p className="text-error text-sm mt-1">{errors.funding_amount}</p>}
                            </div>

                            <div>
                                <label className="block text-label-lg font-bold mb-2">Logo URL</label>
                                <input 
                                    type="url"
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.logo_url}
                                    onChange={e => setData('logo_url', e.target.value)}
                                    placeholder="https://example.com/logo.png"
                                />
                                {errors.logo_url && <p className="text-error text-sm mt-1">{errors.logo_url}</p>}
                            </div>

                            <div>
                                <label className="block text-label-lg font-bold mb-2">Website URL</label>
                                <input 
                                    type="url"
                                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={data.website_url}
                                    onChange={e => setData('website_url', e.target.value)}
                                    placeholder="https://example.com"
                                />
                                {errors.website_url && <p className="text-error text-sm mt-1">{errors.website_url}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                            <input 
                                type="checkbox"
                                id="is_featured"
                                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                                checked={data.is_featured}
                                onChange={e => setData('is_featured', e.target.checked)}
                            />
                            <label htmlFor="is_featured" className="text-body-base font-bold text-amber-500">
                                Mark as Featured Startup
                            </label>
                        </div>

                        <div className="pt-6 border-t border-outline-variant flex justify-end gap-4">
                            <Link 
                                href="/admin/dashboard"
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
