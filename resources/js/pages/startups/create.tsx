import { Form, Head, Link, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import TrackerLayout from '@/layouts/tracker-layout';

interface Props {
    availableSectors: string[];
}

const fundingStages = [
    'Pre-Seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Growth',
    'IPO',
];

export default function CreateStartup({ availableSectors }: Props) {
    const { props } = usePage();
    const status = (props as Record<string, unknown>).status as string | undefined;

    return (
        <>
            <Head title="Submit a Startup" />
            <section className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-3">
                            <span
                                className="material-symbols-outlined text-primary text-[32px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                rocket_launch
                            </span>
                            <h1 className="text-headline-md font-semibold text-on-surface">
                                Submit a Startup
                            </h1>
                        </div>
                        <p className="text-body-base text-on-surface-variant">
                            Share a promising startup with the community. Fill in the details below to add it to this week&apos;s tracker.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-lg bg-primary-container/60 px-4 py-3 text-on-primary-container text-body-sm font-medium">
                            {status}
                        </div>
                    )}

                    <Form
                        action="/startups"
                        method="post"
                        className="space-y-10"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Section 1: Basic Information */}
                                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-primary text-[22px]">
                                            info
                                        </span>
                                        <h2 className="text-title-md font-semibold text-on-surface">
                                            Basic Information
                                        </h2>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                Startup Name <span className="text-error">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                name="name"
                                                required
                                                autoFocus
                                                placeholder="e.g., Acme Inc."
                                                className="bg-surface-container-low border-outline-variant rounded-lg font-mono"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="description" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                Description <span className="text-error">*</span>
                                            </Label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                required
                                                rows={4}
                                                placeholder="What does this startup do? Describe its core product or service..."
                                                className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2.5 px-4 text-body-sm font-mono focus:outline-none focus:border-primary transition-colors resize-none"
                                            />
                                            <InputError message={errors.description} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="mission" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                Mission Statement
                                            </Label>
                                            <textarea
                                                id="mission"
                                                name="mission"
                                                rows={2}
                                                placeholder="The startup's mission or vision..."
                                                className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2.5 px-4 text-body-sm font-mono focus:outline-none focus:border-primary transition-colors resize-none"
                                            />
                                            <InputError message={errors.mission} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="sector" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                    Sector / Industry <span className="text-error">*</span>
                                                </Label>
                                                <div className="relative">
                                                    <select
                                                        id="sector"
                                                        name="sector"
                                                        required
                                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2.5 px-4 text-body-sm font-mono focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Select a sector</option>
                                                        {availableSectors.map((sector) => (
                                                            <option key={sector} value={sector}>
                                                                {sector}
                                                            </option>
                                                        ))}
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
                                                        expand_more
                                                    </span>
                                                </div>
                                                <InputError message={errors.sector} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="hq_location" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                    HQ Location <span className="text-error">*</span>
                                                </Label>
                                                <Input
                                                    id="hq_location"
                                                    type="text"
                                                    name="hq_location"
                                                    required
                                                    placeholder="e.g., San Francisco, CA"
                                                    className="bg-surface-container-low border-outline-variant rounded-lg font-mono"
                                                />
                                                <InputError message={errors.hq_location} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Funding Details */}
                                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-primary text-[22px]">
                                            payments
                                        </span>
                                        <h2 className="text-title-md font-semibold text-on-surface">
                                            Funding Details
                                        </h2>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="funding_stage" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                    Funding Stage <span className="text-error">*</span>
                                                </Label>
                                                <div className="relative">
                                                    <select
                                                        id="funding_stage"
                                                        name="funding_stage"
                                                        required
                                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2.5 px-4 text-body-sm font-mono focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Select stage</option>
                                                        {fundingStages.map((stage) => (
                                                            <option key={stage} value={stage}>
                                                                {stage}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
                                                        expand_more
                                                    </span>
                                                </div>
                                                <InputError message={errors.funding_stage} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="funding_amount" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                    Funding Amount (USD)
                                                </Label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-mono text-body-sm">$</span>
                                                    <Input
                                                        id="funding_amount"
                                                        type="number"
                                                        name="funding_amount"
                                                        min="0"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        className="bg-surface-container-low border-outline-variant rounded-lg font-mono pl-8"
                                                    />
                                                </div>
                                                <InputError message={errors.funding_amount} />
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="founding_date" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                Founding Date
                                            </Label>
                                            <Input
                                                id="founding_date"
                                                type="date"
                                                name="founding_date"
                                                className="bg-surface-container-low border-outline-variant rounded-lg font-mono max-w-xs"
                                            />
                                            <InputError message={errors.founding_date} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Additional Info */}
                                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-primary text-[22px]">
                                            link
                                        </span>
                                        <h2 className="text-title-md font-semibold text-on-surface">
                                            Additional Information
                                        </h2>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="website_url" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                    Website URL
                                                </Label>
                                                <Input
                                                    id="website_url"
                                                    type="url"
                                                    name="website_url"
                                                    placeholder="https://example.com"
                                                    className="bg-surface-container-low border-outline-variant rounded-lg font-mono"
                                                />
                                                <InputError message={errors.website_url} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="logo_url" className="text-label-caps font-mono font-bold uppercase text-on-surface-variant">
                                                    Logo URL
                                                </Label>
                                                <Input
                                                    id="logo_url"
                                                    type="url"
                                                    name="logo_url"
                                                    placeholder="https://example.com/logo.png"
                                                    className="bg-surface-container-low border-outline-variant rounded-lg font-mono"
                                                />
                                                <InputError message={errors.logo_url} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Actions */}
                                <div className="flex items-center justify-between pb-8">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 px-6 py-3 text-body-sm font-mono font-semibold text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-container-high"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            arrow_back
                                        </span>
                                        Cancel
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-mono font-bold uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {processing && <Spinner />}
                                        <span className="material-symbols-outlined text-[18px]">
                                            publish
                                        </span>
                                        Submit Startup
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </section>
        </>
    );
}

CreateStartup.layout = (page: React.ReactNode) => (
    <TrackerLayout>{page}</TrackerLayout>
);
