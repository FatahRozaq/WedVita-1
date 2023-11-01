<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\api\guestMessagesController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\invitationDesignsController;
use App\Http\Controllers\Api\weddingInvitationsController;
use App\Http\Controllers\Api\weddingPhotosController;
use App\Models\weddingInvitations;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    
});

// Authentication
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

// Design Undangan
    Route::post('/designs', [invitationDesignsController::class, 'store']);
    Route::get('/getInvitationDesigns', [invitationDesignsController::class, 'getData']);
    Route::get('/designs/{id}', [invitationDesignsController::class, 'showData']);   
    
// Pesan Undangan
    Route::post('/invitations', [weddingInvitationsController::class, 'store']);
    Route::put('/invitations/{id}',[weddingInvitationsController::class, 'update']);
    Route::delete('/invitations/{id}',[weddingInvitationsController::class, 'destroy']);
    Route::get('/getInvitations/{id}',[weddingInvitationsController::class, 'showData']);
    Route::get('/getWeddingInvitation', [weddingInvitationsController::class, 'getData']);
    Route::get('/getWeddingInvitations/{id}', [weddingInvitationsController::class, 'showDataWeddingInvitations']);   

    Route::post('/photos', [weddingPhotosController::class, 'store']);
    Route::delete('/photos/{id}', [weddingPhotosController::class, 'destroy']);   
    Route::put('/designs/{id}', [invitationDesignsController::class, 'update']);
    Route::delete('/designs/{id}', [invitationDesignsController::class, 'destroy']);

    Route::post('/message', [guestMessagesController::class, 'store']);
    Route::get('/getMessages/{id}',[weddingInvitationsController::class, 'showData']);