<?php

namespace App\Policies;

use App\Enums\StartupRole;
use App\Models\Startup;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StartupPolicy
{
    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->is_admin) {
            return true;
        }

        return null; // Return null to fall through to the policy methods
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        // Startups are public right now
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Startup $startup): bool
    {
        // Startups are public right now
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Any authenticated user can create a startup
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Startup $startup): bool
    {
        // Founder/Admin or Member can update
        return $this->isFounder($user, $startup) || $this->isMember($user, $startup);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Startup $startup): bool
    {
        // Only Founder/Admin can delete
        return $this->isFounder($user, $startup);
    }

    /**
     * Determine whether the user can manage team members.
     */
    public function manageMembers(User $user, Startup $startup): bool
    {
        // Only Founder/Admin can add/remove team members
        return $this->isFounder($user, $startup);
    }

    /**
     * Determine whether the user can manage billing/subscription.
     */
    public function manageBilling(User $user, Startup $startup): bool
    {
        // Only Founder/Admin can manage billing
        return $this->isFounder($user, $startup);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Startup $startup): bool
    {
        return $this->isFounder($user, $startup);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Startup $startup): bool
    {
        return $this->isFounder($user, $startup);
    }

    /**
     * Helper to check if user is the founder/owner.
     */
    protected function isFounder(User $user, Startup $startup): bool
    {
        // Either the primary owner or a user with 'founder' role in pivot
        if ($startup->user_id === $user->id) {
            return true;
        }

        $pivot = $startup->members()->where('user_id', $user->id)->first();
        return $pivot && $pivot->pivot->role === StartupRole::Founder->value;
    }

    /**
     * Helper to check if user is a member.
     */
    protected function isMember(User $user, Startup $startup): bool
    {
        $pivot = $startup->members()->where('user_id', $user->id)->first();
        return $pivot && $pivot->pivot->role === StartupRole::Member->value;
    }

    /**
     * Helper to check if user is a viewer.
     */
    protected function isViewer(User $user, Startup $startup): bool
    {
        $pivot = $startup->members()->where('user_id', $user->id)->first();
        return $pivot && $pivot->pivot->role === StartupRole::Viewer->value;
    }
}
