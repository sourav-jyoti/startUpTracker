import { Head, Link } from '@inertiajs/react';
import FeaturedNewsCard from '@/components/tracker/featured-news-card';
import NewsCard from '@/components/tracker/news-card';
import SectorList from '@/components/tracker/sector-list';

import TrackerLayout from '@/layouts/tracker-layout';
import type { NewsArticle, Sector } from '@/types';

interface Props {
    articles: {
        data: NewsArticle[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    sectors: Sector[];
}

export default function NewsIndex({
    articles,
    sectors,
}: Props) {
    const articlesData = articles.data || [];
    const featuredArticle = articlesData.find((a) => a.is_featured);
    const regularArticles = articlesData.filter((a) => !a.is_featured);
    const thumbnailArticles = regularArticles.filter((a) => a.thumbnail_url);
    const standardArticles = regularArticles.filter((a) => !a.thumbnail_url);

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
                                            <article
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
                                            </article>
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
            <aside className="w-[320px] p-8 border-l border-outline-variant bg-surface-container-low hidden xl:block overflow-y-auto custom-scrollbar">
                <div className="sticky top-0">
                    {/* Funding Trends */}
                    <div className="mb-8">
                        <h4 className="text-label-caps font-mono font-bold text-on-surface-variant mb-4 uppercase tracking-widest">
                            FUNDING TRENDS
                        </h4>
                        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-label-caps font-mono font-bold text-on-surface-variant">
                                        Weekly Volume
                                    </p>
                                    <p className="text-headline-md font-semibold text-secondary">
                                        $1.2B
                                    </p>
                                </div>
                                <span className="text-body-sm font-mono text-secondary flex items-center gap-1 font-bold">
                                    <span className="material-symbols-outlined text-[16px]">
                                        trending_up
                                    </span>
                                    +12%
                                </span>
                            </div>
                            {/* Sparkline bars */}
                            <div className="h-16 flex items-end gap-1 px-1">
                                {[8, 10, 6, 12, 14, 16, 15].map(
                                    (height, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-t-sm ${i >= 4 ? 'bg-secondary' : 'bg-outline-variant/30'}`}
                                            style={{
                                                height: `${height * 4}px`,
                                            }}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Sectors */}
                    <div className="mb-8">
                        <h4 className="text-label-caps font-mono font-bold text-on-surface-variant mb-4 uppercase tracking-widest">
                            ACTIVE SECTORS
                        </h4>
                        <SectorList
                            sectors={sectors.slice(0, 3)}
                            variant="bar"
                        />
                    </div>

                    {/* Saved Tags */}
                    <div>
                        <h4 className="text-label-caps font-mono font-bold text-on-surface-variant mb-4 uppercase tracking-widest">
                            SAVED TAGS
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {[
                                '#series_a',
                                '#saas',
                                '#unicorn_watch',
                                '#web3',
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-surface-container-high text-body-sm font-mono rounded-full border border-outline-variant"
                                >
                                    {tag}
                                </span>
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
