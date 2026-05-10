<?php

namespace Database\Factories;

use App\Models\Startup;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Startup>
 */
class StartupFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->company();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(12),
            'mission' => fake()->paragraphs(2, true),
            'logo_url' => null,
            'funding_amount' => fake()->randomFloat(2, 500000, 50000000),
            'funding_stage' => fake()->randomElement(['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'late-stage']),
            'funding_label' => fake()->randomElement(['HIGH GROWTH POTENTIAL', 'SERIES A TRENDING', 'LATE STAGE VENTURE', 'UNICORN WATCH']),
            'sector' => fake()->randomElement(['AI & ML', 'Fintech', 'Health Tech', 'SaaS', 'Climate Tech', 'Neurotech', 'Cybersecurity', 'Sustainability']),
            'hq_location' => fake()->city().', '.fake()->countryCode(),
            'founding_date' => fake()->dateTimeBetween('-5 years', '-1 year'),
            'burn_rate' => fake()->randomElement(['low', 'medium', 'high']),
            'website_url' => fake()->url(),
            'total_funding' => fake()->randomFloat(2, 1000000, 100000000),
            'is_featured' => false,
            'week_number' => (int) date('W'),
            'year' => (int) date('Y'),
        ];
    }

    /**
     * Mark the startup as featured.
     */
    public function featured(): static
    {
        return $this->state(fn (): array => [
            'is_featured' => true,
        ]);
    }
}
