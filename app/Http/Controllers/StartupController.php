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
    public function index(Request $request): Response
    {
        $weekInput = $request->input('week');
        $isAllWeeks = $weekInput === 'all';
        $weekNumber = $isAllWeeks ? 'all' : (int) ($weekInput ?? date('W'));
        $year = $request->integer('year', (int) date('Y'));
        $sectorFilter = $request->string('sector')->value() ?: null;
        $searchFilter = $request->string('search')->value() ?: null;

        $startups = Startup::query()
            ->when(! $isAllWeeks && !$searchFilter, function ($query) use ($weekNumber): void {
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

        $sectors = Sector::query()
            ->orderByDesc('percentage')
            ->limit(6)
            ->get();

        /** @var list<string> $availableSectors */
        $availableSectors = Startup::query()
            ->distinct()
            ->pluck('sector')
            ->sort()
            ->values()
            ->all();

        /** @var array<int> $weeks */
        $weeksNum = $isAllWeeks ? (int) date('W') : $weekNumber;
        $weeks = range(max(1, $weeksNum - 4), min(52, $weeksNum + 4));

        /** @var \App\Models\User|null $user */
        $user = $request->user();
        $bookmarkedIds = $user ? $user->bookmarkedStartups()->pluck('startup_id')->toArray() : [];

        $startups->each(function ($startup) use ($bookmarkedIds): void {
            $startup->is_bookmarked = in_array($startup->id, $bookmarkedIds);
        });

        return Inertia::render('startups/index', [
            'startups' => $startups,
            'sectors' => $sectors,
            'availableSectors' => $availableSectors,
            'activeSector' => $sectorFilter,
            'search' => $searchFilter,
            'currentWeek' => $weekNumber,
            'currentYear' => $year,
            'weeks' => $weeks,
        ]);
    }

    /**
     * Display the startup detail data for the modal.
     */
    public function show(Request $request, Startup $startup): Response
    {
        $startup->load(['fundingRounds' => function ($query): void {
            $query->orderByDesc('date');
        }, 'teamMembers']);

        /** @var \App\Models\User|null $user */
        $user = $request->user();
        $startup->is_bookmarked = $user ? $user->bookmarkedStartups()->where('startup_id', $startup->id)->exists() : false;

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
        $validated['week_number'] = $request->integer('week_number', (int) date('W'));
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
        if (!$q) return response()->json([]);
        
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
