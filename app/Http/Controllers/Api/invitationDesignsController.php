<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\invitationDesignsRequest;
use App\Models\invitationDesigns;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class invitationDesignsController extends Controller
{
    public function getData()
    {
        $invitationDesigns = InvitationDesigns::all();

        return response()->json([
            'message' => 'Semua data invitation design',
            'designs' => $invitationDesigns,
        ], 200);
    }

    public function showData($id)
    {
        try {
            $design = InvitationDesigns::findOrFail($id);
            return response()->json($design);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desain tidak ditemukan'], 404);
        }
    }

    public function store(invitationDesignsRequest $request)
    {
        // Validasi data lainnya...
        $validatedData = $request->validated();

        // Simpan file gambar dengan nama asli
        $designImage = $request->file('designImage');
        $designImagePath = null;

        if($designImage){
            $designImagePath = $designImage->storeAs($designImage->getClientOriginalName());
        }    
        // Simpan data ke dalam tabel
        $invitationDesigns = new InvitationDesigns([
            'userId' => $validatedData['userId'],
            'designName' => $validatedData['designName'],
            'designDescription' => $validatedData['designDescription'],
            'designImage' => $designImagePath,
            'price' => $validatedData['price'],
            'designLink' => $validatedData['designLink'],
        ]);

        $invitationDesigns->save();

        return response()->json([
            'message' => 'Data invitation design berhasil disimpan',
            'designs' => $invitationDesigns,
        ], 201);
    }

}
