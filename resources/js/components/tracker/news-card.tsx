import type { NewsArticle } from '@/types';

interface NewsCardProps {
    article: NewsArticle;
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
    funding: {
        bg: 'bg-secondary-container',
        text: 'text-secondary',
    },
    acquisition: {
        bg: 'bg-tertiary-fixed-dim',
        text: 'text-on-tertiary-container',
    },
    regulation: {
        bg: 'bg-error-container',
        text: 'text-error',
    },
    'top-story': {
        bg: 'bg-primary-container',
        text: 'text-on-primary-container',
    },
};

export default function NewsCard({ article }: NewsCardProps) {
    const style = categoryStyles[article.category] || categoryStyles.funding;

    return (
        <article className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg hover:shadow-sm transition-shadow group cursor-pointer">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <span
                        className={`text-label-caps font-mono font-bold ${style.text} ${style.bg} px-2 py-1 rounded uppercase`}
                    >
                        {article.category.replace('-', ' ')}
                    </span>
                    <span className="text-body-sm font-mono text-on-surface-variant">
                        {article.source} • {article.source_time}
                    </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    north_east
                </span>
            </div>
            <h3 className="text-headline-md font-semibold mb-2 group-hover:text-primary transition-colors">
                {article.title}
            </h3>
            <p className="text-body-base text-on-surface-variant line-clamp-2">
                {article.excerpt}
            </p>
        </article>
    );
}
