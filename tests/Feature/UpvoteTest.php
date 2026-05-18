<?php

use App\Models\User;
use App\Models\Startup;

test('guests cannot upvote startups', function () {
    $startup = Startup::factory()->create();

    $response = $this->post(route('upvotes.toggle', $startup));
    
    $response->assertRedirect(route('login'));
});

test('authenticated users can upvote and remove upvote from startups', function () {
    $user = User::factory()->create();
    $startup = Startup::factory()->create();

    $this->actingAs($user);

    // Toggle upvote on
    $response = $this->post(route('upvotes.toggle', $startup));
    $response->assertRedirect();
    $response->assertSessionHas('status', 'Startup upvoted successfully!');

    expect($startup->fresh()->upvotes()->count())->toBe(1);
    expect($user->fresh()->upvotedStartups()->where('startup_id', $startup->id)->exists())->toBeTrue();

    // Toggle upvote off
    $response = $this->post(route('upvotes.toggle', $startup));
    $response->assertRedirect();
    $response->assertSessionHas('status', 'Upvote removed!');

    expect($startup->fresh()->upvotes()->count())->toBe(0);
    expect($user->fresh()->upvotedStartups()->where('startup_id', $startup->id)->exists())->toBeFalse();
});
