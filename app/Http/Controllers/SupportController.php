<?php

namespace App\Http\Controllers;

use App\Models\SupportMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupportController extends Controller
{
    /**
     * Show the support page.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        $tickets = [];
        if ($user) {
            $tickets = SupportMessage::where('user_id', $user->id)
                ->orWhere('email', $user->email)
                ->orderByDesc('created_at')
                ->get();
        }

        return Inertia::render('support', [
            'initialUser' => $user ? [
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
            'status' => $request->session()->get('status'),
            'tickets' => $tickets,
        ]);
    }

    /**
     * Store a new support message.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
            'category' => 'required|string|in:general,bug,billing,feature',
            'priority' => 'required|string|in:low,normal,high',
        ]);

        if ($request->user()) {
            $validated['user_id'] = $request->user()->id;
        }

        SupportMessage::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Your support ticket has been submitted. We will contact you soon!')]);

        return back();
    }
}
