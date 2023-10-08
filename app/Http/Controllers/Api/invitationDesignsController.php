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

        if($designImage) {
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

    public function update(invitationDesignsRequest $request, $id)
    {
        try {
            // Validasi data
            $validatedData = $request->validated();

            // Cari desain berdasarkan ID
            $invitationDesigns = InvitationDesigns::findOrFail($id);

            // Pastikan pengguna yang mengirim permintaan adalah pemilik desain
            if ($invitationDesigns->userId != $validatedData['userId']) {
                return response()->json(['message' => 'Anda tidak memiliki izin untuk mengubah desain ini'], 403);
            }

            // Update data desain kecuali gambar
            $invitationDesigns->update([
                'designName' => $validatedData['designName'],
                'designDescription' => $validatedData['designDescription'],
                'price' => $validatedData['price'],
                'designLink' => $validatedData['designLink'],
            ]);

            // Jika ada gambar baru yang dikirim, simpan gambar
            if ($request->hasFile('designImage')) {
                // Hapus gambar lama jika ada
                if ($invitationDesigns->designImage) {
                    // PENTING: Anda mungkin perlu menyesuaikan path gambar lama sesuai dengan struktur penyimpanan Anda
                    Storage::delete($invitationDesigns->designImage);
                }

                // Simpan gambar baru dengan nama yang unik
                $designImage = $request->file('designImage');
                $designImagePath = $designImage->store('design_images');

                // Update path gambar dalam database
                $invitationDesigns->update(['designImage' => $designImagePath]);
            }

            return response()->json(['message' => 'Data invitation design berhasil diupdate', 'design' => $invitationDesigns], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desain tidak ditemukan atau terjadi kesalahan saat memperbarui data'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $invitationDesigns = InvitationDesigns::findOrFail($id);

            // Hapus gambar jika ada
            if ($invitationDesigns->designImage) {
                Storage::delete($invitationDesigns->designImage);
            }

            $invitationDesigns->delete();

            return response()->json(['message' => 'Data invitation design berhasil dihapus'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desain tidak ditemukan'], 404);
        }
    }

}
