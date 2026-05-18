<?php

use App\Models\User;
use App\Models\SupportMessage;
use Inertia\Testing\AssertableInertia as Assert;

test('guests can access support page', function () {
    $response = $this->get(route('support.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('support')
        ->where('initialUser', null)
    );
});

test('authenticated users can access support page and have their details prepopulated', function () {
    $user = User::factory()->create([
        'name' => 'Support User',
        'email' => 'support@example.com',
    ]);

    $response = $this->actingAs($user)->get(route('support.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('support')
        ->where('initialUser.name', 'Support User')
        ->where('initialUser.email', 'support@example.com')
    );
});

test('submitting a support ticket successfully stores it in the database', function () {
    $data = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Help with login',
        'message' => 'This is a detailed support request for testing.',
        'category' => 'general',
        'priority' => 'normal',
    ];

    $response = $this->post(route('support.store'), $data);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
    
    $this->assertDatabaseHas('support_messages', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Help with login',
        'message' => 'This is a detailed support request for testing.',
        'category' => 'general',
        'priority' => 'normal',
    ]);
});

test('submitting invalid support details fails validation', function () {
    $data = [
        'name' => '',
        'email' => 'invalid-email',
        'subject' => '',
        'message' => 'short',
        'category' => 'invalid-category',
        'priority' => 'invalid-priority',
    ];

    $response = $this->post(route('support.store'), $data);

    $response->assertSessionHasErrors(['name', 'email', 'subject', 'message', 'category', 'priority']);
});
