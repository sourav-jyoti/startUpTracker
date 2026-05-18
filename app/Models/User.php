<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password', 'google_id', 'avatar', 'is_admin'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_admin' => 'boolean',
        ];
    }

    /**
     * @return HasMany<Startup, $this>
     */
    public function startups(): HasMany
    {
        return $this->hasMany(Startup::class);
    }

    /**
     * @return BelongsToMany<Startup, $this>
     */
    public function bookmarkedStartups(): BelongsToMany
    {
        return $this->belongsToMany(Startup::class, 'bookmarks');
    }

    /**
     * @return BelongsToMany<Startup, $this>
     */
    public function upvotedStartups(): BelongsToMany
    {
        return $this->belongsToMany(Startup::class, 'upvotes');
    }
}
