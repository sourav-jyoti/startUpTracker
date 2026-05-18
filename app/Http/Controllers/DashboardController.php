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

        $upvotedIds = $user->upvotedStartups()->pluck('startup_id')->toArray();

        $startups = $user->startups()->withCount('upvotes')->orderByDesc('created_at')->get();
        $startups->each(function ($startup) use ($upvotedIds) {
            $startup->is_upvoted = in_array($startup->id, $upvotedIds);
        });

        $bookmarkedStartups = $user->bookmarkedStartups()
            ->withCount('upvotes')
            ->with(['fundingRounds', 'teamMembers'])
            ->get();

        // Calculate statistics
        $stats = [
            'total_submissions' => $startups->count(),
            'total_funding' => $startups->sum('funding_amount'),
            'featured_count' => $startups->where('is_featured', true)->count(),
            'watchlist_count' => $bookmarkedStartups->count(),
        ];

        // Funding trends (last 6 submissions or months)
        $fundingTrends = $user->startups()
            ->select(['created_at', 'funding_amount'])
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get()
            ->map(function ($startup) {
                return [
                    'date' => $startup->created_at ? $startup->created_at->format('M d') : '',
                    'amount' => $startup->funding_amount,
                ];
            });

        // Sector breakdown
        $sectorBreakdown = $user->startups()
            ->selectRaw('sector as name, COUNT(*) as count')
            ->groupBy('sector')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'startups' => $startups,
            'bookmarkedStartups' => $bookmarkedStartups->map(function ($startup) use ($upvotedIds) {
                $startup->is_bookmarked = true;
                $startup->is_upvoted = in_array($startup->id, $upvotedIds);
                return $startup;
            }),
            'charts' => [
                'fundingTrends' => $fundingTrends,
                'sectorBreakdown' => $sectorBreakdown,
            ],
        ]);
    }
}
