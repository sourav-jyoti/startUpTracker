<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Startup;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard with their submissions and stats.
     */
    public function __invoke(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $startups = $user->startups()->orderByDesc('created_at')->get();
        $bookmarkedStartups = $user->bookmarkedStartups()->with(['fundingRounds', 'teamMembers'])->get();

        // Calculate statistics
        $stats = [
            'total_submissions' => $startups->count(),
            'total_funding' => $startups->sum('funding_amount'),
            'featured_count' => $startups->where('is_featured', true)->count(),
            'watchlist_count' => $bookmarkedStartups->count(),
        ];

        // Funding trends (last 6 submissions or months)
        $fundingTrends = $user->startups()
            ->selectRaw("DATE_FORMAT(created_at, '%b %d') as date, funding_amount as amount")
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get();

        // Sector breakdown
        $sectorBreakdown = $user->startups()
            ->selectRaw('sector as name, COUNT(*) as count')
            ->groupBy('sector')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'startups' => $startups,
            'bookmarkedStartups' => $bookmarkedStartups->map(function ($startup) {
                $startup->is_bookmarked = true;
                return $startup;
            }),
            'charts' => [
                'fundingTrends' => $fundingTrends,
                'sectorBreakdown' => $sectorBreakdown,
            ],
        ]);
    }
}
