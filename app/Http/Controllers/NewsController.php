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
        $weekNumber = $request->integer('week', (int) date('W'));
        $year = $request->integer('year', (int) date('Y'));

        $articles = NewsArticle::query()
            ->where('week_number', $weekNumber)
            ->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->get();

        $sectors = Sector::query()
            ->orderByDesc('percentage')
            ->limit(6)
            ->get();

        /** @var array<int> $weeks */
        $weeks = range(max(1, $weekNumber - 4), min(52, $weekNumber + 4));

        return Inertia::render('news/index', [
            'articles' => $articles,
            'sectors' => $sectors,
            'currentWeek' => $weekNumber,
            'currentYear' => $year,
            'weeks' => $weeks,
        ]);
    }
}
