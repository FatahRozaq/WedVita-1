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

        $photo1 = $request->file('photo1');
        $photo2 = $request->file('photo2');
        $photo3 = $request->file('photo3');
        $photo4 = $request->file('photo4');
        $photo5 = $request->file('photo5');
        $wedPhoto1 = $photo1->getClientOriginalName();
        $wedPhoto2 = $photo2->getClientOriginalName();
        $wedPhoto3 = $photo3->getClientOriginalName();
        $wedPhoto4 = $photo4->getClientOriginalName();
        $wedPhoto5 = $photo5->getClientOriginalName();
        $photo1->storeAs('public/wedphotos/', $wedPhoto1);
        $photo2->storeAs('public/wedphotos/', $wedPhoto2);
        $photo3->storeAs('public/wedphotos/', $wedPhoto3);
        $photo4->storeAs('public/wedphotos/', $wedPhoto4);
        $photo5->storeAs('public/wedphotos/', $wedPhoto5);
        $photoPath1 = Storage::url('public/wedphotos/' . $wedPhoto1);
        $photoPath2 = Storage::url('public/wedphotos/' . $wedPhoto2);
        $photoPath3 = Storage::url('public/wedphotos/' . $wedPhoto3);
        $photoPath4 = Storage::url('public/wedphotos/' . $wedPhoto4);
        $photoPath5 = Storage::url('public/wedphotos/' . $wedPhoto5);
        $weddingPhotos = new weddingPhotos([
            'invitationId' => $validatedData['invitationId'],
            'photo1' => $photoPath1,
            'photo2' => $photoPath2,
            'photo3' => $photoPath3,
            'photo4' => $photoPath4,
            'photo5' => $photoPath5,
        ]);

        $weddingPhotos->save();


        // Kembalikan respons sukses atau error
        return response()->json(['message' => 'Photo added successfully', 'data' => $weddingPhotos], 201);
    }

    public function showData($invitationId)
    {
        try {
            $weddingPhotos = weddingPhotos::where('invitationId', $invitationId)->get();
            
            if ($weddingPhotos->isEmpty()) {
                return response()->json(['message' => 'No photos found for this user'], 404);
            }
            
            return response()->json(['weddingPhotos' => $weddingPhotos]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
         
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
