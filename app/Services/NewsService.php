<?php

namespace App\Services;

use App\Models\NewsArticle;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://newsapi.org/v2/everything';

    public function __construct()
    {
        $this->apiKey = config('services.news_api.key', '');
    }

    /**
     * Fetch news and sync with database.
     */
    public function syncNews(string $query = 'startups OR "venture capital" OR "tech startup" OR "funding round" OR "unicorn startup"'): int
    {
        if (empty($this->apiKey)) {
            Log::warning('NewsAPI Key is missing. Please add NEWS_API_KEY to your .env file.');
            return 0;
        }

        try {
            $response = Http::get($this->baseUrl, [
                'q' => $query,
                'language' => 'en',
                'sortBy' => 'publishedAt',
                'apiKey' => $this->apiKey,
                'pageSize' => 100,
            ]);

            if (!$response->successful()) {
                Log::error('NewsAPI Error: ' . $response->body());
                return 0;
            }

            $articles = $response->json('articles');
            $count = 0;

            foreach ($articles as $item) {
                // Check if already exists by URL
                if (NewsArticle::where('url', $item['url'])->exists()) {
                    continue;
                }

                $publishedAt = Carbon::parse($item['publishedAt']);

                NewsArticle::create([
                    'title' => $item['title'],
                    'excerpt' => $item['description'] ?? $item['content'] ?? '',
                    'category' => $this->inferCategory($item['title'] . ' ' . ($item['description'] ?? '')),
                    'source' => $item['source']['name'] ?? 'News',
                    'source_time' => $publishedAt->diffForHumans(),
                    'thumbnail_url' => $item['urlToImage'],
                    'url' => $item['url'],
                    'read_time' => $this->calculateReadTime($item['content'] ?? ''),
                    'is_featured' => false,
                    'week_number' => $publishedAt->weekOfYear,
                    'year' => $publishedAt->year,
                ]);

                $count++;
            }

            return $count;
        } catch (\Exception $e) {
            Log::error('NewsService Exception: ' . $e->getMessage());
            return 0;
        }
    }

    /**
     * Infer category based on keywords.
     */
    protected function inferCategory(string $text): string
    {
        $text = strtolower($text);
        if (str_contains($text, 'funding') || str_contains($text, 'round') || str_contains($text, 'raised')) {
            return 'funding';
        }
        if (str_contains($text, 'acquire') || str_contains($text, 'merger') || str_contains($text, 'acquisition')) {
            return 'acquisition';
        }
        if (str_contains($text, 'law') || str_contains($text, 'regulation') || str_contains($text, 'policy')) {
            return 'regulation';
        }
        return 'top-story';
    }

    /**
     * Basic read time calculation.
     */
    protected function calculateReadTime(string $content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes = ceil($wordCount / 200);
        return $minutes > 0 ? "{$minutes}m read" : "2m read";
    }
}
