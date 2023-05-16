<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaysController;
use App\Http\Controllers\TypesController;
use App\Http\Controllers\BouteilleController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\CellierController;
use App\Http\Controllers\BouteilleCellierController;
use App\Http\Controllers\ListeAchatController;

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
// Routes for UtilisateurController
Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
Route::post('/utilisateurs', [UtilisateurController::class, 'store']);
Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show']);
Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']);
Route::delete('/utilisateurs/{id}', [UtilisateurController::class, 'destroy']);
// Routes for RoleController

Route::get('/roles', [RoleController::class, 'index']);
Route::get('/roles/{id}', [RoleController::class, 'show']);
// Routes for PaysController
Route::get('/pays', [PaysController::class, 'index']);
Route::get('/pays/{id}', [PaysController::class, 'show']);
// Routes for TypesController
Route::get('/types', [TypesController::class, 'index']);
Route::get('/types/{id}', [TypesController::class, 'show']);
// Routes for CellierController
Route::get('/celliers', [CellierController::class, 'index']);
Route::get('/celliers/{id}', [CellierController::class, 'show']);
Route::post('/celliers', [CellierController::class, 'store']);
Route::put('/celliers/{id}', [CellierController::class, 'update']);
Route::delete('/celliers/{id}', [CellierController::class, 'destroy']);
// Routes for BouteilleController
Route::get('/bouteilles', [BouteilleController::class, 'index']);
Route::get('/bouteilles/{id}', [BouteilleController::class, 'show']);
Route::post('/bouteilles', [BouteilleController::class, 'store']);
Route::put('/bouteilles/{id}', [BouteilleController::class, 'update']);
Route::delete('/bouteilles/{id}', [BouteilleController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
