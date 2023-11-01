<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\guestMessagesRequest;
use App\Models\guestMessages;
use Illuminate\Http\Request;

class guestMessagesController extends Controller
{
    public function store(guestMessagesRequest $request)
    {
        $validatedData = $request->validated();

        $guestMessages = new guestMessages([
            'invitationId' => $validatedData['invitationId'],
            'guestName' => $validatedData['guestName'],
            'message' => $validatedData['message'],
        ]);

        $guestMessages->save();
        return response()->json([
            'message' => 'Data wedding invitation berhasil disimpan',
            'guestMessages' => $guestMessages,
        ], 201);
    }
}
