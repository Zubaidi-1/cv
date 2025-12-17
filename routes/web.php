<?php

use App\Http\Controllers\EducationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\LayoutController;
use App\Http\Controllers\ObjectiveController;
use App\Http\Controllers\PersonalInformationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkillController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/personal-information', [PersonalInformationController::class, 'store'])->name('personal-information.store');
    Route::delete('/personal-information', [PersonalInformationController::class, 'destroy'])->name('personal-information.destroy');
    Route::post('/experiences', [ExperienceController::class, 'store'])->name('experiences.store');
    Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy');
    Route::post('/skills', [SkillController::class, 'store'])->name('skills.store');
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy');
    Route::post('/objectives', [ObjectiveController::class, 'store'])->name('objective.store');
    Route::post('/education', [EducationController::class, 'store'])->name('education.store');
    Route::get('/layouts', [LayoutController::class, 'index'])->name('layouts.index');
    Route::get('/layouts/{layout}', [LayoutController::class, 'show'])->name('layouts.show');
    Route::delete("/delete-personal", [ProfileController::class, "deletePersonalData"])->name("delete");

});

require __DIR__ . '/auth.php';
