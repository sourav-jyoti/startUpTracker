<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\StartupController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', [StartupController::class, 'index'])->name('home');
Route::get('/startups/{startup}', [StartupController::class, 'show'])->name('startups.show');
Route::get('/news', [NewsController::class, 'index'])->name('news.index');

Route::inertia('/welcome', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
