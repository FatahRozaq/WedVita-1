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

    public function update(guestMessagesRequest $request, $id)
    {
        $guestMessage = guestMessages::find($id);

        if (!$guestMessage) {
            return response()->json(['message' => 'Pesan tamu tidak ditemukan'], 404);
        }

        $validatedData = $request->validated();

        $guestMessage->invitationId = $validatedData['invitationId'];
        $guestMessage->guestName = $validatedData['guestName'];
        $guestMessage->message = $validatedData['message'];

        $guestMessage->save();

        return response()->json([
            'message' => 'Data pesan tamu berhasil diperbarui',
            'guestMessage' => $guestMessage,
        ], 200);
    }


    public function destroy($id)
    {
        $guestMessage = guestMessages::find($id);

        if (!$guestMessage) {
            return response()->json(['message' => 'Pesan tamu tidak ditemukan'], 404);
        }

        $guestMessage->delete();

        return response()->json(['message' => 'Data pesan tamu berhasil dihapus'], 200);
    }

}
