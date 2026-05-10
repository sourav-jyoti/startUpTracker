<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use App\Models\Startup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StartupController extends Controller
{
    /**
     * Display the home page with startups feed and analytics.
     */
    public function index(Request $request): Response
    {
        $weekNumber = $request->integer('week', (int) date('W'));
        $year = $request->integer('year', (int) date('Y'));
        $sectorFilter = $request->string('sector')->value() ?: null;

        $startups = Startup::query()
            ->where('week_number', $weekNumber)
            ->when($sectorFilter, function ($query, string $sector): void {
                $query->where('sector', $sector);
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
        $weeks = range(max(1, $weekNumber - 4), min(52, $weekNumber + 4));

        return Inertia::render('startups/index', [
            'startups' => $startups,
            'sectors' => $sectors,
            'availableSectors' => $availableSectors,
            'activeSector' => $sectorFilter,
            'currentWeek' => $weekNumber,
            'currentYear' => $year,
            'weeks' => $weeks,
        ]);
    }

    /**
     * Display the startup detail data for the modal.
     */
    public function show(Startup $startup): Response
    {
        $startup->load(['fundingRounds' => function ($query): void {
            $query->orderByDesc('date');
        }, 'teamMembers']);

        return Inertia::render('startups/show', [
            'startup' => $startup,
        ]);
    }
}
