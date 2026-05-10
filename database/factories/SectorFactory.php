<?php

namespace Database\Factories;

use App\Models\Sector;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sector>
 */
class SectorFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['AI & Machine Learning', 'Fintech', 'Climate Tech', 'Health Tech', 'SaaS & Enterprise', 'Cybersecurity']),
            'icon' => fake()->randomElement(['cloud', 'biotech', 'electric_bolt', 'memory', 'security', 'analytics']),
            'percentage' => fake()->randomFloat(2, 5, 50),
        ];
    }
}
