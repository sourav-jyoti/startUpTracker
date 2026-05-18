<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Startup;
use Illuminate\Http\RedirectResponse;
use App\Notifications\StartupUpvoted;

class UpvoteController extends Controller
{
    /**
     * Toggle upvote for a startup.
     */
    public function toggle(Request $request, Startup $startup): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        if ($user->upvotedStartups()->where('startup_id', $startup->id)->exists()) {
            $user->upvotedStartups()->detach($startup->id);
            $message = 'Upvote removed!';
        } else {
            $user->upvotedStartups()->attach($startup->id);
            $message = 'Startup upvoted successfully!';

            if ($startup->user_id && $startup->user_id !== $user->id) {
                if ($startup->user) {
                    $startup->user->notify(new StartupUpvoted($startup, $user));
                }
            }
        }

        return back()->with('status', $message);
    }
}
