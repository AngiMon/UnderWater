<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\Health\HealthCheckController;
use App\Http\Controllers\Task\CreateTaskController;
use App\Http\Controllers\Task\DestroyTaskController;
use App\Http\Controllers\Task\TasksController;
use App\Http\Controllers\Task\UpdateTaskController;
use App\Http\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('health-check', HealthCheckController::class);


//Route::prefix('auth')
//    ->as('auth.')
//    ->group(static function() {
//        Route::post('sign-in', SignInController::class)->name('sign-in');
//        Route::post('sign-up', SignUpController::class)->name('sign-up');
//    }
//);

Route::prefix('tasks')->middleware(Authenticate::class)
    ->as('tasks.')
    ->group(static function() {
        Route::get('/', TasksController::class)->name('list');
        Route::post('/', CreateTaskController::class)->name('create');
        Route::put('/{id}', UpdateTaskController::class)->name('update');
        Route::delete('/{id}', DestroyTaskController::class)->name('update');
    });

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
