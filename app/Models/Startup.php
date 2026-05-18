<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Startup extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'mission',
        'logo_url',
        'funding_amount',
        'funding_stage',
        'funding_label',
        'sector',
        'hq_location',
        'founding_date',
        'burn_rate',
        'website_url',
        'total_funding',
        'competition',
        'registration_type',
        'certificate_number',
        'is_featured',
        'week_number',
        'year',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'funding_amount' => 'decimal:2',
            'total_funding' => 'decimal:2',
            'founding_date' => 'date',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany<FundingRound, $this>
     */
    public function fundingRounds(): HasMany
    {
        return $this->hasMany(FundingRound::class);
    }

    /**
     * @return HasMany<TeamMember, $this>
     */
    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }

    /**
     * @return BelongsToMany<User, $this>
     */
    public function bookmarkedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'bookmarks');
    }

    /**
     * @return BelongsToMany<User, $this>
     */
    public function upvotes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'upvotes');
    }
}
