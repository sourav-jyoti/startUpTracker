<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Startup;
use Illuminate\Http\RedirectResponse;

class BookmarkController extends Controller
{
    /**
     * Toggle bookmark for a startup.
     */
    public function toggle(Request $request, Startup $startup): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        if ($user->bookmarkedStartups()->where('startup_id', $startup->id)->exists()) {
            $user->bookmarkedStartups()->detach($startup->id);
            $message = 'Startup removed from watchlist!';
        } else {
            $user->bookmarkedStartups()->attach($startup->id);
            $message = 'Startup added to watchlist!';
        }

        return back()->with('status', $message);
    }
}
