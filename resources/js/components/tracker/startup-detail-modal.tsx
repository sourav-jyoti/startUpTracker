import { router } from '@inertiajs/react';
import { 
    Bookmark, 
    BookmarkCheck, 
    Twitter, 
    Linkedin, 
    Github, 
    Mail, 
    Globe, 
    User,
    ChevronRight,
    X,
    Rocket,
    ChevronUp
} from 'lucide-react';
import { formatFunding, formatStage } from '@/components/tracker/startup-card';
import type { Startup } from '@/types';
import bookmarks from '@/routes/bookmarks';
import upvotes from '@/routes/upvotes';

interface StartupDetailModalProps {
    startup: Startup;
    onClose: () => void;
}

export default function StartupDetailModal({
    startup,
    onClose,
}: StartupDetailModalProps) {
    const toggleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.post(bookmarks.toggle.url({ startup: startup.id }), {}, {
            preserveScroll: true,
        });
    };

    const toggleUpvote = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.post(upvotes.toggle.url({ startup: startup.id }), {}, {
            preserveScroll: true,
        });
    };

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
                    <X className="w-5 h-5" />
                </button>

                {/* Sidebar Info */}
                <div className="md:w-1/3 bg-surface-container p-8 flex flex-col border-r border-outline-variant overflow-y-auto">
                    {/* Logo */}
                    <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-sm border border-outline-variant mb-6 mx-auto md:mx-0 overflow-hidden relative">
                        {startup.logo_url ? (
                            <img
                                src={startup.logo_url}
                                alt={startup.name}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Rocket className="w-12 h-12 text-on-surface-variant opacity-30" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="text-display-lg font-bold leading-tight">
                            {startup.name}
                        </h2>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                className={`transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-body-sm font-bold active:scale-95 border cursor-pointer ${
                                    startup.is_upvoted
                                        ? 'text-white bg-primary hover:bg-primary/90 border-primary shadow-sm shadow-primary/20'
                                        : 'text-on-surface bg-surface hover:bg-surface-container-high border-outline-variant hover:border-outline-variant/80'
                                }`}
                                onClick={toggleUpvote}
                            >
                                <ChevronUp className={`w-4 h-4 transition-transform ${startup.is_upvoted ? 'stroke-[3px]' : ''}`} />
                                <span>{startup.upvotes_count ?? 0}</span>
                            </button>
                            <button
                                className={`transition-all p-2 rounded-full hover:bg-surface-container-high active:scale-90 border border-transparent cursor-pointer ${
                                    startup.is_bookmarked ? 'text-primary' : 'text-on-surface-variant'
                                }`}
                                onClick={toggleBookmark}
                            >
                                {startup.is_bookmarked ? (
                                    <BookmarkCheck className="w-6 h-6 fill-current" />
                                ) : (
                                    <Bookmark className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>

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
                                <span className="text-label-caps font-mono font-bold opacity-50 block mb-1 text-[10px]">
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
                            <span className="text-label-caps font-mono font-bold opacity-50 block mb-1 text-[10px]">
                                HQ Location
                            </span>
                            <span className="text-body-sm font-semibold">
                                {startup.hq_location}
                            </span>
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-outline-variant">
                            {startup.website_url && (
                                <a
                                    href={startup.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-on-surface-variant hover:text-primary transition-colors"
                                >
                                    <Globe className="w-5 h-5" />
                                </a>
                            )}
                            <a
                                href="#"
                                className="text-on-surface-variant hover:text-primary transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {/* About & Mission */}
                    <section className="mb-10">
                        <h3 className="text-title-sm font-semibold mb-3 border-b border-outline-variant/30 pb-2">
                            About {startup.name}
                        </h3>
                        {startup.competition && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-lg mb-4">
                                <Rocket className="w-4 h-4 text-primary" />
                                <span className="text-body-sm font-bold text-primary tracking-tight">
                                    Part of {startup.competition}
                                </span>
                            </div>
                        )}
                        <p className="text-body-base text-on-surface-variant leading-relaxed">
                            {startup.mission || startup.description}
                        </p>
                    </section>

                    {/* Registration Details */}
                    {(startup.registration_type || startup.certificate_number) && (
                        <section className="mb-10">
                            <h3 className="text-title-sm font-semibold mb-3 border-b border-outline-variant/30 pb-2">
                                Registration Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {startup.registration_type && (
                                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                                        <span className="text-label-caps font-mono font-bold opacity-50 block mb-1 text-[10px]">
                                            Registration Type
                                        </span>
                                        <span className="text-body-base font-semibold">
                                            {startup.registration_type}
                                        </span>
                                    </div>
                                )}
                                {startup.certificate_number && (
                                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                                        <span className="text-label-caps font-mono font-bold opacity-50 block mb-1 text-[10px]">
                                            Certificate Number
                                        </span>
                                        <span className="text-body-base font-mono font-semibold">
                                            {startup.certificate_number}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Core Team */}
                    {startup.team_members && startup.team_members.length > 0 && (
                        <section className="mb-10">
                            <h3 className="text-title-sm font-semibold mb-6 border-b border-outline-variant/30 pb-2">
                                Core Team
                            </h3>
                            <div className="space-y-8">
                                {startup.team_members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex flex-col md:flex-row gap-6 p-4 rounded-xl hover:bg-surface-container transition-colors"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden flex-shrink-0 mx-auto md:mx-0 shadow-sm">
                                            {member.photo_url ? (
                                                <img
                                                    src={member.photo_url}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User className="w-8 h-8 text-on-surface-variant opacity-30" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-body-lg font-bold">
                                                            {member.name}
                                                        </p>
                                                        {member.is_founder && (
                                                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20">FOUNDER</span>
                                                        )}
                                                    </div>
                                                    <p className="text-label-caps font-mono font-bold text-on-surface-variant opacity-60">
                                                        {member.role}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {member.twitter_url && (
                                                        <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                                                            <Twitter className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    {member.linkedin_url && (
                                                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                                                            <Linkedin className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    {member.github_url && (
                                                        <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                                                            <Github className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            {member.bio && (
                                                <p className="text-body-sm text-on-surface-variant leading-relaxed italic">
                                                    "{member.bio}"
                                                </p>
                                            )}
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
