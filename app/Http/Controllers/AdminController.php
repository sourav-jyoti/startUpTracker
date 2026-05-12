<?php

namespace App\Http\Controllers;

use App\Models\Startup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $startups = Startup::with('user')
            ->orderByDesc('created_at')
            ->paginate(15);

        $stats = [
            'total_startups' => Startup::count(),
            'featured_startups' => Startup::where('is_featured', true)->count(),
            'pending_review' => Startup::where('is_featured', false)->count(),
        ];

        return Inertia::render('admin/dashboard', [
            'startups' => $startups,
            'stats' => $stats,
        ]);
    }

    /**
     * Toggle the featured status of a startup.
     */
    public function toggleFeatured(Startup $startup): RedirectResponse
    {
        $startup->update([
            'is_featured' => !$startup->is_featured,
        ]);

        return back()->with('success', 'Startup status updated successfully.');
    }

    /**
     * Delete a startup.
     */
    public function destroy(Startup $startup): RedirectResponse
    {
        $startup->delete();

        return back()->with('success', 'Startup deleted successfully.');
    }
}
