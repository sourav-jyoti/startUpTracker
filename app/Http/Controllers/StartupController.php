<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStartupRequest;
use App\Models\Sector;
use App\Models\Startup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StartupController extends Controller
{
    /**
     * Display the home page with startups feed and analytics.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        if ($request->user() && $request->user()->is_admin) {
            return redirect()->route('admin.dashboard');
        }

        $weekInput = $request->input('week');
        $isAllWeeks = $weekInput === 'all';
        $currentWeek = min(10, (int) date('W'));
        $weekNumber = $isAllWeeks ? 'all' : (int) ($weekInput ?? $currentWeek);
        if ($weekNumber !== 'all') {
            $weekNumber = min(10, max(1, $weekNumber));
        }
        $year = $request->integer('year', (int) date('Y'));
        $sectorFilter = $request->string('sector')->value() ?: null;
        $searchFilter = $request->string('search')->value() ?: null;

        $startups = Startup::query()
            ->withCount('upvotes')
            ->when(!$isAllWeeks && !$searchFilter, function ($query) use ($weekNumber): void {
                $query->where('week_number', $weekNumber);
            })
            ->when($sectorFilter, function ($query, string $sector): void {
                $query->where('sector', $sector);
            })
            ->when($searchFilter, function ($query, string $search): void {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('sector', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('teamMembers', function ($sq) use ($search) {
                            $sq->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->orderByDesc('is_featured')
            ->orderByDesc('funding_amount')
            ->get();

        $trendingByFunding = Startup::query()
            ->orderByDesc('funding_amount')
            ->limit(3)
            ->get();

        $topByUpvote = Startup::query()
            ->withCount('upvotes')
            ->orderByDesc('upvotes_count')
            ->limit(3)
            ->get();

        /** @var list<string> $availableSectors */
        $availableSectors = Startup::query()
            ->distinct()
            ->pluck('sector')
            ->sort()
            ->values()
            ->all();

        /** @var array<int> $weeks */
        $weeksNum = $isAllWeeks ? $currentWeek : $weekNumber;
        $weeks = range(1, 10);

        /** @var \App\Models\User|null $user */
        $user = $request->user();
        $bookmarkedIds = $user ? $user->bookmarkedStartups()->pluck('startup_id')->toArray() : [];
        $upvotedIds = $user ? $user->upvotedStartups()->pluck('startup_id')->toArray() : [];

        $startups->each(function ($startup) use ($bookmarkedIds, $upvotedIds): void {
            $startup->is_bookmarked = in_array($startup->id, $bookmarkedIds);
            $startup->is_upvoted = in_array($startup->id, $upvotedIds);
        });

        // User specific dashboard data
        $userStartups = collect();
        $bookmarkedStartups = collect();
        if ($user) {
            $userStartups = $user->startups()->withCount('upvotes')->orderByDesc('created_at')->get();
            $userStartups->each(function ($startup) use ($upvotedIds, $bookmarkedIds) {
                $startup->is_upvoted = in_array($startup->id, $upvotedIds);
                $startup->is_bookmarked = in_array($startup->id, $bookmarkedIds);
            });

            $bookmarkedStartups = $user->bookmarkedStartups()
                ->withCount('upvotes')
                ->with(['fundingRounds', 'teamMembers'])
                ->get()
                ->map(function ($startup) use ($upvotedIds) {
                    $startup->is_bookmarked = true;
                    $startup->is_upvoted = in_array($startup->id, $upvotedIds);
                    return $startup;
                });
        }

        // Stats calculation
        $hasSubmissions = $userStartups->isNotEmpty();
        $hasBookmarks = $bookmarkedStartups->isNotEmpty();
        if ($hasSubmissions) {
            $stats = [
                'total_submissions' => $userStartups->count(),
                'total_submissions_title' => 'My Submissions',
                'total_submissions_subtitle' => 'Startups listed',
                'total_funding' => $userStartups->sum('funding_amount'),
                'total_funding_title' => 'Total Value',
                'total_funding_subtitle' => 'Aggregate funding',
                'featured_count' => $userStartups->where('is_featured', true)->count(),
                'featured_title' => 'Featured',
                'featured_subtitle' => 'Premium status',
                'watchlist_count' => $bookmarkedStartups->count(),
                'watchlist_title' => 'Watchlist',
                'watchlist_subtitle' => 'Saved for later',
            ];
        } elseif ($hasBookmarks) {
            $stats = [
                'total_submissions' => Startup::count(),
                'total_submissions_title' => 'Platform Base',
                'total_submissions_subtitle' => 'Ecosystem startups',
                'total_funding' => $bookmarkedStartups->sum('funding_amount'),
                'total_funding_title' => 'Watchlist Value',
                'total_funding_subtitle' => 'Total tracked funding',
                'featured_count' => $bookmarkedStartups->where('is_featured', true)->count(),
                'featured_title' => 'Featured Tracked',
                'featured_subtitle' => 'Watchlist featured',
                'watchlist_count' => $bookmarkedStartups->count(),
                'watchlist_title' => 'Watchlist',
                'watchlist_subtitle' => 'Saved for later',
            ];
        } else {
            $stats = [
                'total_submissions' => Startup::count(),
                'total_submissions_title' => 'Platform Base',
                'total_submissions_subtitle' => 'Ecosystem startups',
                'total_funding' => Startup::sum('funding_amount'),
                'total_funding_title' => 'Ecosystem Value',
                'total_funding_subtitle' => 'Global aggregate funding',
                'featured_count' => Startup::where('is_featured', true)->count(),
                'featured_title' => 'Featured',
                'featured_subtitle' => 'Ecosystem premium',
                'watchlist_count' => 0,
                'watchlist_title' => 'Watchlist',
                'watchlist_subtitle' => 'No saved startups yet',
            ];
        }

        // Portfolio IDs for analytics
        $portfolioStartupIds = $userStartups->pluck('id')
            ->merge($bookmarkedIds)
            ->unique()
            ->filter();

        if ($portfolioStartupIds->isNotEmpty()) {
            $analyticsQuery = Startup::whereIn('id', $portfolioStartupIds);
        } else {
            $analyticsQuery = Startup::query();
        }

        // Funding trends (last 10 startups)
        $fundingTrends = (clone $analyticsQuery)
            ->select(['created_at', 'funding_amount'])
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get()
            ->map(function ($startup) {
                return [
                    'date' => $startup->created_at ? $startup->created_at->format('M d') : '',
                    'amount' => (float) $startup->funding_amount,
                ];
            });

        // Sector breakdown
        $sectorBreakdown = (clone $analyticsQuery)
            ->selectRaw('sector as name, COUNT(*) as count')
            ->groupBy('sector')
            ->get();

        return Inertia::render('startups/index', [
            'startups' => $startups,
            'trendingByFunding' => $trendingByFunding,
            'topByUpvote' => $topByUpvote,
            'availableSectors' => $availableSectors,
            'activeSector' => $sectorFilter,
            'search' => $searchFilter,
            'currentWeek' => $weekNumber,
            'currentYear' => $year,
            'weeks' => $weeks,
            // Merged User Dashboard Data
            'userStartups' => $userStartups,
            'bookmarkedStartups' => $bookmarkedStartups,
            'stats' => $stats,
            'charts' => [
                'fundingTrends' => $fundingTrends,
                'sectorBreakdown' => $sectorBreakdown,
            ],
        ]);
    }

    /**
     * Display the startup detail data for the modal.
     */
    public function show(Request $request, Startup $startup): Response
    {
        $startup->load([
            'fundingRounds' => function ($query): void {
                $query->orderByDesc('date');
            },
            'teamMembers'
        ]);

        $startup->loadCount('upvotes');

        /** @var \App\Models\User|null $user */
        $user = $request->user();
        $startup->is_bookmarked = $user ? $user->bookmarkedStartups()->where('startup_id', $startup->id)->exists() : false;
        $startup->is_upvoted = $user ? $user->upvotedStartups()->where('startup_id', $startup->id)->exists() : false;

        return Inertia::render('startups/show', [
            'startup' => $startup,
        ]);
    }

    /**
     * Display the form for creating a new startup.
     */
    public function create(): Response
    {
        /** @var list<string> $availableSectors */
        $availableSectors = Startup::query()
            ->distinct()
            ->pluck('sector')
            ->sort()
            ->values()
            ->all();

        return Inertia::render('startups/create', [
            'availableSectors' => $availableSectors,
        ]);
    }

    /**
     * Store a newly created startup in the database.
     */
    public function store(StoreStartupRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['slug'] = Str::slug($validated['name']);
        $validated['week_number'] = min(10, max(1, $request->integer('week_number', min(10, (int) date('W')))));
        $validated['year'] = (int) date('Y');
        $validated['user_id'] = $request->user()?->id;
        $validated['total_funding'] = $validated['funding_amount'] ?? 0;
        $validated['funding_label'] = $validated['funding_stage'];

        Startup::create($validated);

        return redirect()->route('home')->with('status', 'Startup submitted successfully!');
    }
    /**
     * Search startups for the command palette.
     */
    public function search(Request $request)
    {
        $q = $request->query('q');
        if (!$q)
            return response()->json([]);

        return Startup::where('name', 'like', "%{$q}%")
            ->orWhere('sector', 'like', "%{$q}%")
            ->orWhere('description', 'like', "%{$q}%")
            ->orWhereHas('teamMembers', function ($sq) use ($q) {
                $sq->where('name', 'like', "%{$q}%");
            })
            ->limit(5)
            ->get();
    }
}
