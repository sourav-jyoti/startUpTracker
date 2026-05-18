import { Head, Link } from '@inertiajs/react';
import FeaturedNewsCard from '@/components/tracker/featured-news-card';
import NewsCard from '@/components/tracker/news-card';
import FundingTrendCard from '@/components/tracker/funding-trend-card';
import { formatFunding } from '@/components/tracker/startup-card';

import TrackerLayout from '@/layouts/tracker-layout';
import type { NewsArticle, Startup } from '@/types';

interface Props {
    articles: {
        data: NewsArticle[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    trendingByFunding: Startup[];
    topByUpvote: Startup[];
}

export default function NewsIndex({
    articles,
    trendingByFunding,
    topByUpvote,
}: Props) {
    const articlesData = articles.data || [];
    // With our new controller logic, the first article is the most upvoted (highest score)
    const featuredArticle = articlesData[0];
    const regularArticles = articlesData.filter((a) => a.id !== featuredArticle?.id);

    return (
        <>
            <Head title="News - Startup Tracker" />

            {/* Center Feed */}
            <section className="flex-1 p-8 bg-surface overflow-y-auto flex flex-col">
                <div className="flex-1">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Featured Layout (First 3 articles) */}
                        {(featuredArticle || articlesData.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {featuredArticle ? (
                                    <FeaturedNewsCard article={featuredArticle} />
                                ) : articlesData[0] ? (
                                    <FeaturedNewsCard article={articlesData[0]} />
                                ) : null}
                                
                                <div className="flex flex-col gap-6">
                                    {articlesData
                                        .filter(a => a.id !== (featuredArticle?.id || articlesData[0]?.id))
                                        .slice(0, 2)
                                        .map((article) => (
                                            <a
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key={article.id}
                                                className="bg-surface-container-lowest border border-outline-variant p-5 rounded-lg flex gap-4 hover:border-primary transition-colors cursor-pointer flex-1"
                                            >
                                                {article.thumbnail_url && (
                                                    <div className="w-20 h-20 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden">
                                                        <img
                                                            src={article.thumbnail_url}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="text-title-sm font-semibold mb-1 line-clamp-2">
                                                        {article.title}
                                                    </h4>
                                                    <span className="text-label-caps font-mono font-bold text-on-surface-variant">
                                                        {article.read_time} • {article.source}
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Remaining Articles in standard card format */}
                        <div className="grid grid-cols-1 gap-6">
                            {articlesData
                                .filter(a => a.id !== (featuredArticle?.id || articlesData[0]?.id))
                                .slice(2)
                                .map((article) => (
                                    <NewsCard key={article.id} article={article} />
                                ))}

                            {articlesData.length === 0 && (
                                <div className="text-center py-24 bg-surface-container/30 rounded-3xl border-2 border-dashed border-outline-variant">
                                    <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-on-surface-variant/40">
                                        <span className="material-symbols-outlined text-[40px]">newspaper</span>
                                    </div>
                                    <h3 className="text-title-lg font-bold mb-2">No news found</h3>
                                    <p className="text-body-base text-on-surface-variant">Try searching for something else or check back later.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination - Moved to the very bottom */}
                {articles.total > 0 && (
                    <div className="mt-12 pb-4 flex justify-center items-center gap-2">
                        {articles.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg border transition-all ${
                                    link.active
                                        ? 'bg-primary text-on-primary border-primary'
                                        : 'bg-surface-container-lowest border-outline-variant hover:border-primary text-on-surface-variant'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Right Rail */}
            <aside className="w-[400px] p-10 bg-surface-container-low/50 border-l border-outline-variant flex-shrink-0 overflow-y-auto custom-scrollbar hidden xl:block">
                <div className="sticky top-0">
                    <FundingTrendCard />
                    
                    <div className="mb-8 mt-8">
                        <h3 className="text-title-sm font-semibold mb-4">Trending by Funding</h3>
                        <div className="space-y-3">
                            {trendingByFunding.map(startup => (
                                <Link href={`/startups/${startup.slug}`} key={startup.id} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline-variant cursor-pointer hover:border-primary transition-colors block">
                                    <div>
                                        <h4 className="font-semibold text-sm">{startup.name}</h4>
                                        <p className="text-xs text-on-surface-variant">{startup.sector}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-primary">{formatFunding(startup.funding_amount)}</p>
                                        <p className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">{startup.funding_stage}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-title-sm font-semibold mb-4">Top by Upvotes</h3>
                        <div className="space-y-3">
                            {topByUpvote.map(startup => (
                                <Link href={`/startups/${startup.slug}`} key={startup.id} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline-variant cursor-pointer hover:border-primary transition-colors block">
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
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

NewsIndex.layout = (page: React.ReactNode) => (
    <TrackerLayout>{page}</TrackerLayout>
);
