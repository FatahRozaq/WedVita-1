<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\weddingInvitationsRequest;
use App\Models\weddingInvitations;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class weddingInvitationsController extends Controller
{
    public function store(weddingInvitationsRequest $request)
    {
        // Validasi data menggunakan request
        $validatedData = $request->validated();

        // Simpan file gambar dengan nama asli
        $groomPhoto = $request->file('groomPhoto');
        $bridePhoto = $request->file('bridePhoto');
        $coverPhoto = $request->file('coverPhoto');

        $groomPhotoPath = null;
        $bridePhotoPath = null;
        $coverPhotoPath = null;

        if ($groomPhoto) {
            $groomPhotoPath = $groomPhoto->storeAs($groomPhoto->getClientOriginalName());
        }

        if ($bridePhoto) {
            $bridePhotoPath = $bridePhoto->storeAs($bridePhoto->getClientOriginalName());
        }

        if ($coverPhoto) {
            $coverPhotoPath = $coverPhoto->storeAs($coverPhoto->getClientOriginalName());
        }

        // Simpan data ke dalam tabel
        $weddingInvitations = new weddingInvitations([
            'designId' => $validatedData['designId'],
            'userId' => $validatedData['userId'],
            'groomName' => $validatedData['groomName'],
            'brideName' => $validatedData['brideName'],
            'groomPhoto' => $groomPhotoPath,
            'bridePhoto' => $bridePhotoPath,
            'coverPhoto' => $coverPhotoPath,
            'weddingDate' => $validatedData['weddingDate'],
            'weddingTime' => $validatedData['weddingTime'],
            'weddingMap' => $validatedData['weddingMap'],
            'weddingLocation' => $validatedData['weddingLocation'],
            'fatherOfGroom' => $validatedData['fatherOfGroom'],
            'motherOfGroom' => $validatedData['motherOfGroom'],
            'fatherOfBride' => $validatedData['fatherOfBride'],
            'motherOfBride' => $validatedData['motherOfBride'],
            'accountNumber' => $validatedData['accountNumber'],
        ]);

        $weddingInvitations->save();

        return response()->json([
            'message' => 'Data wedding invitation berhasil disimpan',
            'invitations' => $weddingInvitations,
        ], 201);
    }

    public function update(weddingInvitationsRequest $request, $id)
    {
        
        $validatedData = $request->validated();

        $weddingInvitations = weddingInvitations::find($id);

        if (!$weddingInvitations) {
            return response()->json(['message' => 'Data wedding invitation tidak ditemukan'], 404);
        }

        
        $groomPhoto = $request->file('groomPhoto');
        $bridePhoto = $request->file('bridePhoto');
        $coverPhoto = $request->file('coverPhoto');

        if ($groomPhoto) {
            $groomPhotoPath = $groomPhoto->storeAs($groomPhoto->getClientOriginalName());
            $weddingInvitations->groomPhoto = $groomPhotoPath;
        }

        if ($bridePhoto) {
            $bridePhotoPath = $bridePhoto->storeAs($bridePhoto->getClientOriginalName());
            $weddingInvitations->bridePhoto = $bridePhotoPath;
        }

        if ($coverPhoto) {
            $coverPhotoPath = $coverPhoto->storeAs($coverPhoto->getClientOriginalName());
            $weddingInvitations->coverPhoto = $coverPhotoPath;
        }

        $weddingInvitations->update([
            'designId' => $validatedData['designId'],
            'userId' => $validatedData['userId'],
            'groomName' => $validatedData['groomName'],
            'brideName' => $validatedData['brideName'],
            'weddingDate' => $validatedData['weddingDate'],
            'weddingTime' => $validatedData['weddingTime'],
            'weddingMap' => $validatedData['weddingMap'],
            'weddingLocation' => $validatedData['weddingLocation'],
            'fatherOfGroom' => $validatedData['fatherOfGroom'],
            'motherOfGroom' => $validatedData['motherOfGroom'],
            'fatherOfBride' => $validatedData['fatherOfBride'],
            'motherOfBride' => $validatedData['motherOfBride'],
            'accountNumber' => $validatedData['accountNumber'],
        ]);

        return response()->json([
            'message' => 'Data wedding invitation berhasil diupdate',
            'invitations' => $weddingInvitations,
        ], 200);
    }

    public function destroy($id)
    {
       
        $weddingInvitations = weddingInvitations::find($id);

        if (!$weddingInvitations) {
            return response()->json([
                'message' => 'Data wedding invitation tidak ditemukan',
            ], 404);
        }

       
        if ($weddingInvitations->groomPhoto) {
            Storage::delete($weddingInvitations->groomPhoto);
        }

        if ($weddingInvitations->bridePhoto) {
            Storage::delete($weddingInvitations->bridePhoto);
        }

        if ($weddingInvitations->coverPhoto) {
            Storage::delete($weddingInvitations->coverPhoto);
        }

       
        $weddingInvitations->delete();

        return response()->json([
            'message' => 'Data wedding invitation berhasil dihapus',
        ], 200);
    }


}
