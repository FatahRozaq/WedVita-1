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

    public function store(Request $request)
{
    try {
        // Simpan file gambar dengan nama asli
        $designImage = $request->file('designImage');
        // $designImagePath = $designImage->store('design_images'); // Simpan gambar dalam direktori 'design_images'

        // Simpan data ke dalam tabel
        $invitationDesigns = new InvitationDesigns([
            'userId' => 1,
            'designName' => $request->input('designName'),
            'designDescription' => $request->input('designDescription'),
            'designImage' => $designImage, // Simpan path gambar yang telah disimpan
            'price' => $request->input('price'),
            'designLink' => $request->input('designLink'),
        ]);

        $invitationDesigns->save();

        return response()->json([
            'message' => 'Data invitation design berhasil disimpan',
            'designs' => $invitationDesigns,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Terjadi kesalahan saat menyimpan data invitation design',
        ], 500);
    }
}

}
