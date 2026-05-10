import { Head } from '@inertiajs/react';
import FeaturedNewsCard from '@/components/tracker/featured-news-card';
import NewsCard from '@/components/tracker/news-card';
import SectorList from '@/components/tracker/sector-list';

import TrackerLayout from '@/layouts/tracker-layout';
import type { NewsArticle, Sector } from '@/types';

interface Props {
    articles: NewsArticle[];
    sectors: Sector[];
}

export default function NewsIndex({
    articles,
    sectors,
}: Props) {
    const featuredArticle = articles.find((a) => a.is_featured);
    const regularArticles = articles.filter((a) => !a.is_featured);
    const thumbnailArticles = regularArticles.filter((a) => a.thumbnail_url);
    const standardArticles = regularArticles.filter((a) => !a.thumbnail_url);

    return (
        <>
            <Head title="News - Startup Tracker" />

            {/* Center Feed */}
            <section className="flex-1 p-8 bg-surface overflow-y-auto">

                <div className="grid grid-cols-1 gap-6">
                    {/* Standard news cards (first 2) */}
                    {standardArticles.slice(0, 2).map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}

                    {/* Featured layout */}
                    {(featuredArticle || thumbnailArticles.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {featuredArticle && (
                                <FeaturedNewsCard article={featuredArticle} />
                            )}
                            <div className="flex flex-col gap-6">
                                {thumbnailArticles
                                    .slice(0, 2)
                                    .map((article) => (
                                        <article
                                            key={article.id}
                                            className="bg-surface-container-lowest border border-outline-variant p-5 rounded-lg flex gap-4 hover:border-primary transition-colors cursor-pointer"
                                        >
                                            {article.thumbnail_url && (
                                                <div className="w-20 h-20 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden">
                                                    <img
                                                        src={
                                                            article.thumbnail_url
                                                        }
                                                        alt={article.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-title-sm font-semibold mb-1">
                                                    {article.title}
                                                </h4>
                                                <span className="text-label-caps font-mono font-bold text-on-surface-variant">
                                                    {article.read_time} •{' '}
                                                    {article.source}
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Remaining standard cards */}
                    {standardArticles.slice(2).map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
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
