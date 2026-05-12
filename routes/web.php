<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\StartupController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', [StartupController::class, 'index'])->name('home');
Route::get('/news', [NewsController::class, 'index'])->name('news.index');

Route::inertia('/welcome', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('welcome');

// Google OAuth routes
Route::middleware('guest')->group(function () {
    Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])->name('auth.google.redirect');
    Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('auth.google.callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard');
});

// Authenticated startup routes (must be before {startup} wildcard)
Route::middleware(['auth'])->group(function () {
    Route::get('/startups/create', [StartupController::class, 'create'])->name('startups.create');
    Route::post('/startups', [StartupController::class, 'store'])->name('startups.store');
});

// Public startup detail route (after /startups/create to avoid wildcard conflict)
Route::get('/startups/{startup}', [StartupController::class, 'show'])->name('startups.show');

require __DIR__.'/settings.php';
