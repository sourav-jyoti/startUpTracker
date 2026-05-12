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

        $startups = $user->startups()
            ->orderByDesc('created_at')
            ->get();

        $stats = [
            'total_submissions' => $startups->count(),
            'total_funding_managed' => (float) $startups->sum('funding_amount'),
            'featured_startups' => $startups->where('is_featured', true)->count(),
        ];

        return Inertia::render('dashboard', [
            'startups' => $startups,
            'stats' => $stats,
        ]);
    }
}
