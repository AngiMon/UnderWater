<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Task\TasksController;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', HomeController::class)->name('home');
Route::get('/login', [AuthController::class, 'login'])->name('sign-in');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/tasks', TasksController::class);


Route::prefix('projects')->middleware(Authenticate::class)
    ->as('projects.')
    ->group(static function() {
        Route::get('/', [ProjectController::class, 'index'])->name('projects_list');
        Route::get('/add', [ProjectController::class, 'create'])->name('projects_create');
        Route::post('/', [ProjectController::class, 'store'])->name('projects_store');

    });
