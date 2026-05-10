import { formatFunding, formatStage } from '@/components/tracker/startup-card';
import type { Startup } from '@/types';

interface StartupDetailModalProps {
    startup: Startup;
    onClose: () => void;
}

export default function StartupDetailModal({
    startup,
    onClose,
}: StartupDetailModalProps) {
    const totalFunding = startup.funding_rounds
        ? startup.funding_rounds.reduce(
              (sum, round) => sum + parseFloat(round.amount),
              0,
          )
        : parseFloat(startup.total_funding);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-outline-variant">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 hover:bg-surface-container rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                {/* Sidebar Info */}
                <div className="md:w-1/3 bg-surface-container p-8 flex flex-col border-r border-outline-variant">
                    {/* Logo */}
                    <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-sm border border-outline-variant mb-6 mx-auto md:mx-0 overflow-hidden">
                        {startup.logo_url ? (
                            <img
                                src={startup.logo_url}
                                alt={startup.name}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-surface-variant text-[48px]">
                                    rocket_launch
                                </span>
                            </div>
                        )}
                    </div>

                    <h2 className="text-display-lg font-bold mb-2">
                        {startup.name}
                    </h2>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-label-caps font-mono font-bold px-2 py-1 bg-surface-container-high rounded border border-outline-variant">
                            {formatStage(startup.funding_stage)}
                        </span>
                        {startup.funding_label && (
                            <span className="text-label-caps font-mono font-bold px-2 py-1 bg-secondary-container text-on-secondary-container rounded">
                                {startup.funding_label}
                            </span>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-4 mt-auto">
                        {startup.founding_date && (
                            <div>
                                <span className="text-label-caps font-mono font-bold opacity-50 block mb-1">
                                    Founding Date
                                </span>
                                <span className="text-body-sm font-semibold">
                                    {new Date(
                                        startup.founding_date,
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                        )}
                        <div>
                            <span className="text-label-caps font-mono font-bold opacity-50 block mb-1">
                                HQ Location
                            </span>
                            <span className="text-body-sm font-semibold">
                                {startup.hq_location}
                            </span>
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-outline-variant">
                            <a
                                href={startup.website_url || '#'}
                                className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                            >
                                public
                            </a>
                            <a
                                href="#"
                                className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                            >
                                hub
                            </a>
                            <a
                                href="#"
                                className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                            >
                                mail
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {/* Mission */}
                    {startup.mission && (
                        <section className="mb-10">
                            <h3 className="text-title-sm font-semibold mb-3 border-b border-outline-variant/30 pb-2">
                                Mission & Vision
                            </h3>
                            <p className="text-body-base text-on-surface-variant leading-relaxed">
                                {startup.mission}
                            </p>
                        </section>
                    )}

                    {/* Core Team */}
                    {startup.team_members && startup.team_members.length > 0 && (
                        <section className="mb-10">
                            <h3 className="text-title-sm font-semibold mb-4 border-b border-outline-variant/30 pb-2">
                                Core Team
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                {startup.team_members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden flex-shrink-0">
                                            {member.photo_url ? (
                                                <img
                                                    src={member.photo_url}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-on-surface-variant">
                                                        person
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-body-sm font-bold">
                                                {member.name}
                                            </p>
                                            <p className="text-label-caps font-mono font-bold opacity-60">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Funding History */}
                    {startup.funding_rounds &&
                        startup.funding_rounds.length > 0 && (
                            <section>
                                <h3 className="text-title-sm font-semibold mb-4 border-b border-outline-variant/30 pb-2">
                                    Funding History
                                </h3>
                                <div className="space-y-4">
                                    {startup.funding_rounds.map(
                                        (round, index) => (
                                            <div
                                                key={round.id}
                                                className={`flex justify-between items-center p-4 rounded-lg ${
                                                    index === 0
                                                        ? 'bg-surface-container-low border border-outline-variant/50'
                                                        : 'border border-outline-variant/30'
                                                }`}
                                            >
                                                <div>
                                                    <p className="text-body-sm font-bold">
                                                        {round.round_name}
                                                    </p>
                                                    <p className="text-label-caps font-mono font-bold opacity-50">
                                                        {new Date(
                                                            round.date,
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'short',
                                                            },
                                                        )}{' '}
                                                        • Lead:{' '}
                                                        {round.lead_investor}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`text-title-sm font-mono ${
                                                        index === 0
                                                            ? 'text-secondary'
                                                            : ''
                                                    }`}
                                                >
                                                    {formatFunding(
                                                        round.amount,
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* Total */}
                                <div className="mt-6 flex justify-between items-center pt-4 border-t border-outline-variant">
                                    <span className="text-label-caps font-mono font-bold">
                                        Total Funding
                                    </span>
                                    <span className="text-headline-md font-mono text-primary font-bold">
                                        {formatFunding(totalFunding)}
                                    </span>
                                </div>
                            </section>
                        )}
                </div>
            </div>
        </div>
    );
}
