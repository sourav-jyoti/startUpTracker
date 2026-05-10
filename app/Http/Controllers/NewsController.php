<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use App\Models\Sector;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display the news page with articles and analytics rail.
     */
    public function index(Request $request): Response
    {
        $articles = NewsArticle::query()
            ->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->get();

        $sectors = Sector::query()
            ->orderByDesc('percentage')
            ->limit(6)
            ->get();

        return Inertia::render('news/index', [
            'articles' => $articles,
            'sectors' => $sectors,
        ]);
    }
}
