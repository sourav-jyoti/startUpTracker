<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamMember extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'startup_id',
        'name',
        'role',
        'photo_url',
    ];

    /**
     * @return BelongsTo<Startup, $this>
     */
    public function startup(): BelongsTo
    {
        return $this->belongsTo(Startup::class);
    }
}
