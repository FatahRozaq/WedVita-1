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
            $groomPhotoPath = $groomPhoto->storeAs('groom_photos', $groomPhoto->getClientOriginalName());
        }

        if ($bridePhoto) {
            $bridePhotoPath = $bridePhoto->storeAs('bride_photos', $bridePhoto->getClientOriginalName());
        }

        if ($coverPhoto) {
            $coverPhotoPath = $coverPhoto->storeAs('cover_photos', $coverPhoto->getClientOriginalName());
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
}
