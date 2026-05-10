<?php

namespace Database\Factories;

use App\Models\Startup;
use App\Models\TeamMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TeamMember>
 */
class TeamMemberFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'startup_id' => Startup::factory(),
            'name' => fake()->name(),
            'role' => fake()->randomElement(['CEO & Founder', 'CTO', 'COO', 'VP Engineering', 'Chief Product Officer']),
            'photo_url' => null,
        ];
    }
}
