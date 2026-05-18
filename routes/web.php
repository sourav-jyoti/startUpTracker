<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\StartupController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminUserController;
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

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
    
    // Admin Startup Management
    Route::get('/startups/create', [AdminController::class, 'create'])->name('startups.create');
    Route::post('/startups', [AdminController::class, 'store'])->name('startups.store');
    Route::get('/startups/{startup}/edit', [AdminController::class, 'edit'])->name('startups.edit');
    Route::put('/startups/{startup}', [AdminController::class, 'update'])->name('startups.update');
    Route::post('/startups/{startup}/toggle-featured', [AdminController::class, 'toggleFeatured'])->name('startups.toggle-featured');
    Route::delete('/startups/{startup}', [AdminController::class, 'destroy'])->name('startups.destroy');

    // Admin User Management
    Route::resource('users', AdminUserController::class)->except(['show']);
});

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

// Authenticated startup actions
Route::middleware(['auth'])->group(function () {
    Route::get('/startups/create', [StartupController::class, 'create'])->name('startups.create');
    Route::post('/startups', [StartupController::class, 'store'])->name('startups.store');
    Route::post('/startups/{startup}/bookmark', [BookmarkController::class, 'toggle'])->name('bookmarks.toggle');
    Route::post('/startups/{startup}/upvote', [UpvoteController::class, 'toggle'])->name('upvotes.toggle');
});

// API Search
Route::get('/api/search', [StartupController::class, 'search'])->name('api.search');

// Public startup detail route (must be last due to wildcard)
Route::get('/startups/{startup:slug}', [StartupController::class, 'show'])->name('startups.show');

require __DIR__.'/settings.php';
