<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\weddingPhotosRequest;
use App\Models\weddingPhotos;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class weddingPhotosController extends Controller
{
    public function store(weddingPhotosRequest $request)
    {
       
        $validatedData = $request->validated();

        $photo = $request->file('photo');
        $photoPath = $photo->storeAs($photo->getClientOriginalName());
        
        $weddingPhotos = new weddingPhotos([
            'invitationId' => $validatedData['invitationId'],
            'photo' => $photoPath,
            'photoInformation' => $validatedData['photoInformation'],
            
        ]);

        $weddingPhotos->save();


        // Kembalikan respons sukses atau error
        return response()->json(['message' => 'Photo added successfully', 'data' => $weddingPhotos], 201);
    }

    public function destroy($id)
    {
       
        $weddingPhotos = weddingPhotos::find($id);

        if (!$weddingPhotos) {
            return response()->json([
                'message' => 'Data wedding photo tidak ditemukan',
            ], 404);
        }

       
        
        Storage::delete($weddingPhotos->photo);
        

       
        $weddingPhotos->delete();

        return response()->json([
            'message' => 'Data wedding photo berhasil dihapus',
        ], 200);
    }
}
