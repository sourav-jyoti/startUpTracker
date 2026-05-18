import type { NewsArticle } from '@/types';

interface FeaturedNewsCardProps {
    article: NewsArticle;
}

export default function FeaturedNewsCard({ article }: FeaturedNewsCardProps) {
    return (
        <a 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-primary text-on-primary p-8 rounded-lg relative overflow-hidden group cursor-pointer"
        >
            <div className="relative z-10">
                <span className="text-label-caps font-mono font-bold bg-white/20 px-2 py-1 rounded uppercase">
                    TOP STORY
                </span>
                <h3 className="text-display-lg font-bold mt-4 mb-4 leading-tight">
                    {article.title}
                </h3>
                <button className="flex items-center gap-2 text-body-sm font-bold group-hover:translate-x-2 transition-transform">
                    READ ANALYSIS{' '}
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </button>
            </div>
            {/* Background decoration */}
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                <span className="material-symbols-outlined text-[200px]">
                    trending_up
                </span>
            </div>
        </a>
    );
}
