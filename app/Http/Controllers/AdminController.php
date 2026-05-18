<?php

namespace App\Http\Controllers;

use App\Models\Startup;
use App\Models\User;
use App\Notifications\NewStartupAdded;
use App\Notifications\StartupSubmitted;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
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
     * Show the form for creating a new startup.
     */
    public function create(): Response
    {
        return Inertia::render('admin/startups/create');
    }

    /**
     * Store a newly created startup in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'mission' => ['nullable', 'string'],
            'logo_url' => ['nullable', 'url'],
            'funding_amount' => ['nullable', 'numeric', 'min:0'],
            'funding_stage' => ['required', 'string', 'max:50'],
            'sector' => ['required', 'string', 'max:100'],
            'hq_location' => ['required', 'string', 'max:255'],
            'website_url' => ['nullable', 'url', 'max:255'],
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . uniqid();
        $validated['user_id'] = auth()->id();
        $validated['is_featured'] = $request->boolean('is_featured', false);

        $startup = Startup::create($validated);

        // Notify the admin that it was submitted successfully
        if (auth()->check()) {
            auth()->user()->notify(new StartupSubmitted($startup));
        }

        // Notify all other users
        $users = User::where('id', '!=', $startup->user_id)->get();
        if ($users->isNotEmpty()) {
            Notification::send($users, new NewStartupAdded($startup));
        }

        return redirect()->route('admin.dashboard')->with('success', 'Startup created successfully.');
    }

    /**
     * Show the form for editing the specified startup.
     */
    public function edit(Startup $startup): Response
    {
        return Inertia::render('admin/startups/edit', [
            'startup' => $startup,
        ]);
    }

    /**
     * Update the specified startup in storage.
     */
    public function update(Request $request, Startup $startup): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'mission' => ['nullable', 'string'],
            'logo_url' => ['nullable', 'url'],
            'funding_amount' => ['nullable', 'numeric', 'min:0'],
            'funding_stage' => ['required', 'string', 'max:50'],
            'sector' => ['required', 'string', 'max:100'],
            'hq_location' => ['required', 'string', 'max:255'],
            'website_url' => ['nullable', 'url', 'max:255'],
        ]);

        if ($request->name !== $startup->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . uniqid();
        }

        $validated['is_featured'] = $request->boolean('is_featured', false);

        $startup->update($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Startup updated successfully.');
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
