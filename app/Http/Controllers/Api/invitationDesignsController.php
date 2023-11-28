<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\invitationDesigns;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\invitationDesignsRequest;

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
        
        $validatedData = $request->validated();

        $image = $request->file('designImage');
        $imageName = $image->getClientOriginalName();

        // Simpan gambar ke folder storage/app/public/images
        $image->storeAs('public/images', $imageName);

        // Dapatkan URL gambar yang disimpan
        $imageUrl = Storage::url('public/images/' . $imageName);

        $invitationDesigns = new InvitationDesigns([
            'userId' => $request->input('userId'),
            'designName' => $validatedData['designName'],
            'designDescription' => $validatedData['designDescription'],
            'designImage' => $imageUrl,
            'price' => $validatedData['price'],
            'designLink' => $validatedData['designLink'],
        ]);

        $invitationDesigns->save();

        return response()->json([
            'message' => 'Data invitation design berhasil disimpan',
            'designs' => $invitationDesigns,
        ], 201);
    }

    public function downloadDesign($filename)
    {
        $path = storage_path('app/public/designs/' . $filename);
        if (file_exists($path)) {
            return response()->download($path, $filename);
        } else {
            return response()->json(['message' => 'File tidak ditemukan'], 404);
        }
    }


    public function update($id, request $request)
    {
        try {
            // Validasi data
            // $validatedData = $request->validated();

            // Cari desain berdasarkan ID
            $invitationDesigns = InvitationDesigns::findOrFail($id);

            // $invitationDesigns->update($request->all());
            // return $invitationDesigns;

            // Pastikan pengguna yang mengirim permintaan adalah pemilik desain
            // if ($invitationDesigns->userId != $validatedData['userId']) {
            //     return response()->json(['message' => 'Anda tidak memiliki izin untuk mengubah desain ini'], 403);
            // }

            // Update data desain kecuali gambar
            $invitationDesigns->update([
                'designName' => $request->designName,
                'designDescription' => $request->designDescription,
                'price' => $request->price,
                'designLink' => $request->designLink,
            ]);

            // $userId = $request->userId;
            // $designName = $request->designName;
            // $designDescription = $request->designDescription;
            // $price = $request->price;
            // $designLink = $request->designLink;
            

            // Jika ada gambar baru yang dikirim, simpan gambar
            if ($request->hasFile('designImage')) {
                // Hapus gambar lama jika ada
                if ($invitationDesigns->designImage) {
                    Storage::delete('public/images/' . basename($invitationDesigns->designImage));
                }
                //////////////////

                $image = $request->file('designImage');
                $imageName = $image->getClientOriginalName();

                // Simpan gambar ke folder storage/app/public/images
                $image->storeAs('public/images', $imageName);

                // Dapatkan URL gambar yang disimpan
                $imageUrl = Storage::url('public/images/' . $imageName);

                //////////////////
                // Simpan gambar baru dengan nama yang unik
                // $designImage = $request->file('designImage');
                // $imageName = $designImage->getClientOriginalName();
                
                // $image->storeAs('public/images', $imageName);

                // // Dapatkan URL gambar yang disimpan
                // $imageUrl = Storage::url('public/images/' . $imageName);

                // Update path gambar dalam database
                $invitationDesigns->update(['designImage' => $imageUrl]);
            }
            

            return response()->json(['message' => 'Data invitation design berhasil diupdate', 'design' => $invitationDesigns], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desain tidak ditemukan atau terjadi kesalahan saat memperbarui data'], 404);
        }

    }

    // public function update(invitationDesignsRequest $request, $id)
    // {
    //     $validatedData = $request->validated();
    
    //     // Temukan desain undangan berdasarkan ID
    //     $invitationDesigns = InvitationDesigns::find($id);
    
    //     if (!$invitationDesigns) {
    //         return response()->json(['message' => 'Desain undangan tidak ditemukan'], 404);
    //     }
    
    //     // Jika ada file gambar baru, proses pengunggahan dan perbarui URL gambar
    //     if ($request->hasFile('designImage')) {
    //         $image = $request->file('designImage');
    //         $imageName = $image->getClientOriginalName();
    //         $image->storeAs('public/images', $imageName);
    //         $imageUrl = Storage::url('public/images/' . $imageName);
    //         $invitationDesigns->designImage = $imageUrl;
    //     }
    
    //     // Update data desain undangan
    //     $invitationDesigns->update([
    //         'userId' => $request->input('userId'),
    //         'designName' => $validatedData['designName'],
    //         'designDescription' => $validatedData['designDescription'],
    //         'price' => $validatedData['price'],
    //         'designLink' => $validatedData['designLink'],
    //     ]);
    
    //     return response()->json([
    //         'message' => 'Data invitation design berhasil diperbarui',
    //         'designs' => $invitationDesigns,
    //     ], 200);
    // }
    

    public function detroy($id)
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
