<?php

namespace Database\Factories;

use App\Models\FundingRound;
use App\Models\Startup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FundingRound>
 */
class FundingRoundFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'startup_id' => Startup::factory(),
            'round_name' => fake()->randomElement(['Seed Round', 'Series A Round', 'Series B Round', 'Series C Round', 'Pre-Seed Round']),
            'amount' => fake()->randomFloat(2, 500000, 20000000),
            'lead_investor' => fake()->randomElement(['Sequoia Capital', 'Index Ventures', 'Y Combinator', 'Andreessen Horowitz', 'Accel Partners', 'Benchmark', 'Greylock Partners']),
            'date' => fake()->dateTimeBetween('-3 years', 'now'),
        ];
    }
}
