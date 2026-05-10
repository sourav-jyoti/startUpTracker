<?php

namespace Database\Factories;

use App\Models\NewsArticle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NewsArticle>
 */
class NewsArticleFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(10),
            'excerpt' => fake()->paragraph(2),
            'category' => fake()->randomElement(['funding', 'acquisition', 'regulation', 'top-story']),
            'source' => fake()->randomElement(['TechCrunch', 'Bloomberg Technology', 'Financial Times', 'Wired', 'The Verge', 'Market Pulse']),
            'source_time' => fake()->randomElement(['1h ago', '2h ago', '5h ago', '8h ago', '12h ago', '1d ago']),
            'thumbnail_url' => null,
            'url' => fake()->url(),
            'read_time' => fake()->randomElement(['3m read', '5m read', '8m read', '12m read']),
            'is_featured' => false,
            'week_number' => (int) date('W'),
            'year' => (int) date('Y'),
        ];
    }

    /**
     * Mark the article as featured.
     */
    public function featured(): static
    {
        return $this->state(fn (): array => [
            'is_featured' => true,
            'category' => 'top-story',
        ]);
    }
}
