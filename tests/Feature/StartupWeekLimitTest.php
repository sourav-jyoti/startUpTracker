<?php

use App\Models\User;
use App\Models\Startup;

test('submitting startup with week number between 1 and 10 is successful', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('startups.store'), [
        'name' => 'Valid Startup',
        'sector' => 'Tech',
        'stage' => 'Seed',
        'funding_stage' => 'Seed',
        'hq_location' => 'San Francisco',
        'description' => 'A valid startup',
        'week_number' => 10,
    ]);

    $response->assertRedirect(route('home'));
    $this->assertDatabaseHas('startups', [
        'name' => 'Valid Startup',
        'week_number' => 10,
    ]);
});

test('submitting startup with week number greater than 10 fails validation', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('startups.store'), [
        'name' => 'Invalid Startup',
        'sector' => 'Tech',
        'stage' => 'Seed',
        'funding_stage' => 'Seed',
        'hq_location' => 'San Francisco',
        'description' => 'An invalid startup',
        'week_number' => 11,
    ]);

    $response->assertSessionHasErrors(['week_number']);
});

test('startup store defaults to a week clamped to max 10 if none specified', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('startups.store'), [
        'name' => 'Default Clamped Week Startup',
        'sector' => 'Tech',
        'stage' => 'Seed',
        'funding_stage' => 'Seed',
        'hq_location' => 'San Francisco',
        'description' => 'A startup with default week number',
    ]);

    $response->assertRedirect(route('home'));

    $startup = Startup::where('name', 'Default Clamped Week Startup')->first();
    expect($startup)->not->toBeNull();
    expect($startup->week_number)->toBeLessThanOrEqual(10);
});
