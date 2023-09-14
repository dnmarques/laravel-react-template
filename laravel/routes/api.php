<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum', 'trim-strings']], function () {
    Route::group(['prefix' => 'tasks', 'middleware' => ['trim-strings']], function () {
        Route::get('/', [TaskController::class, 'index'])->name('api.tasks.index');
        Route::post('/', [TaskController::class, 'create'])->name('api.tasks.create');
        Route::put('{task:uuid}', [TaskController::class, 'update'])->name('api.tasks.update');
        Route::delete('{task:uuid}', [TaskController::class, 'delete'])->name('api.tasks.delete');
        Route::post('{task:uuid}/complete', [TaskController::class, 'complete'])->name('api.tasks.complete');
    });
});

require __DIR__ . '/auth.php';
