<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use App\Models\Sector;
use App\Models\Startup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display the news page with articles and analytics rail.
     */
    public function index(Request $request, \App\Services\NewsService $newsService): Response
    {
        $articlesCount = NewsArticle::count();

        // Auto-sync if fewer than 10 articles exist to ensure a healthy feed
        if ($articlesCount < 10) {
            $newsService->syncNews();
        }

        $searchFilter = $request->string('search')->value() ?: null;

        $articles = NewsArticle::query()
            ->when($searchFilter, function ($query, string $search): void {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('excerpt', 'like', "%{$search}%")
                      ->orWhere('source', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->paginate(8)
            ->withQueryString();

        $sectors = Sector::query()
            ->orderByDesc('percentage')
            ->limit(6)
            ->get();

        $availableSectors = Startup::query()
            ->distinct()
            ->pluck('sector')
            ->sort()
            ->values()
            ->all();

        return Inertia::render('news/index', [
            'articles' => $articles,
            'sectors' => $sectors,
            'availableSectors' => $availableSectors,
            'search' => $searchFilter,
        ]);
    }
}
