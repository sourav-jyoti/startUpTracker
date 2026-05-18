<?php

namespace App\Services;

use App\Models\NewsArticle;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsService
{
    protected string $baseUrl = 'https://hacker-news.firebaseio.com/v0';

    public function __construct()
    {
    }

    /**
     * Fetch news and sync with database using Hacker News API.
     */
    public function syncNews(): int
    {
        try {
            $response = Http::get("{$this->baseUrl}/topstories.json");

            if (!$response->successful()) {
                Log::error('Hacker News API Error: Failed to fetch top stories');
                return 0;
            }

            $storyIds = $response->json();
            
            // Limit to top 30 to avoid excessive API calls
            $topStoryIds = array_slice($storyIds, 0, 30);
            
            $count = 0;

            foreach ($topStoryIds as $id) {
                $storyResponse = Http::get("{$this->baseUrl}/item/{$id}.json");
                
                if (!$storyResponse->successful()) {
                    continue;
                }
                
                $item = $storyResponse->json();
                
                if (!$item || ($item['type'] ?? '') !== 'story' || ($item['deleted'] ?? false) || ($item['dead'] ?? false)) {
                    continue;
                }

                $url = $item['url'] ?? "https://news.ycombinator.com/item?id={$id}";

                // Check if already exists by URL
                if (NewsArticle::where('url', $url)->exists()) {
                    continue;
                }

                $publishedAt = Carbon::createFromTimestamp($item['time']);
                $title = $item['title'] ?? 'Untitled';
                $text = isset($item['text']) ? strip_tags(html_entity_decode($item['text'])) : '';

                // Extract source domain from URL
                $source = 'Hacker News';
                if (!empty($item['url'])) {
                    $parsedUrl = parse_url($item['url']);
                    if (isset($parsedUrl['host'])) {
                        $source = str_replace('www.', '', $parsedUrl['host']);
                    }
                }

                NewsArticle::create([
                    'title' => $title,
                    'excerpt' => $text,
                    'category' => $this->inferCategory($title . ' ' . $text),
                    'source' => $source,
                    'source_time' => $publishedAt->diffForHumans(),
                    'thumbnail_url' => null,
                    'url' => $url,
                    'read_time' => $this->calculateReadTime($text),
                    'score' => $item['score'] ?? 0,
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
