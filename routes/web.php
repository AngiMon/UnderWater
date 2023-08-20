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


Route::prefix('projects')->middleware(Authenticate::class)
    ->as('projects.')
    ->group(static function() {
        Route::get('/', [ProjectController::class, 'index'])->name('projects_list');
        Route::get('/add', [ProjectController::class, 'create'])->name('project_create');
        Route::post('/', [ProjectController::class, 'store'])->name('project_store');
        Route::get('/{slug}', [ProjectController::class, 'edit'])->name('project.edit');
    });

Route::prefix('tasks')->middleware(Authenticate::class)
    ->as('tasks.')
    ->group(static function() {
        Route::get('/', [TasksController::class, 'index'])->name('tasks_list');
//        Route::get('/add', [TasksController::class, 'create'])->name('task_create');
        Route::post('/', [TasksController::class, 'store'])->name('task_store');
        Route::post('/list-update', [TasksController::class, 'manyUpdate'])->name('task.many.update');
    });
