<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\weddingInvitationsRequest;
use App\Models\weddingInvitations;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\invitationOrders;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class weddingInvitationsController extends Controller
{
    public function showData($userId)
    {
        try {
            $weddingInvitations = weddingInvitations::where('userId', $userId)->get();
            
            if ($weddingInvitations->isEmpty()) {
                return response()->json(['message' => 'No invitations found for this user'], 404);
            }
            
            return response()->json(['weddingInvitations' => $weddingInvitations]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
         
    }

    public function getData()
    {
        $weddingInvitations = weddingInvitations::all();

        return response()->json([
            'message' => 'Semua data invitation design',
            'designs' => $weddingInvitations,
        ], 200);
    }

    public function store(weddingInvitationsRequest $request)
    {
        // Validasi data menggunakan request
        $validatedData = $request->validated();
        // $validatedDataOrder = $requestOrder->validated();

        // Simpan file gambar dengan nama asli
        $groomPhoto = $request->file('groomPhoto');
        $bridePhoto = $request->file('bridePhoto');
        $coverPhoto = $request->file('coverPhoto');

        $groomPhotoPath = null;
        $bridePhotoPath = null;
        $coverPhotoPath = null;

        if ($groomPhoto) {
            $groomPhotoPath = $groomPhoto->getClientOriginalName();
        }

        if ($bridePhoto) {
            $bridePhotoPath = $bridePhoto->getClientOriginalName();
        }

        if ($coverPhoto) {
            $coverPhotoPath = $coverPhoto->getClientOriginalName();
        }

        $groomPhoto->storeAs('public/weddingInvitationPhoto/mainPhoto', $groomPhotoPath);
        $bridePhoto->storeAs('public/weddingInvitationPhoto/mainPhoto', $bridePhotoPath);
        $coverPhoto->storeAs('public/weddingInvitationPhoto/mainPhoto', $coverPhotoPath);

        $groomPhotoUrl = Storage::url('public/weddingInvitationPhoto/mainPhoto/' . $groomPhotoPath);
        $bridePhotoUrl = Storage::url('public/weddingInvitationPhoto/mainPhoto/' . $bridePhotoPath);
        $coverPhotoUrl = Storage::url('public/weddingInvitationPhoto/mainPhoto/' . $coverPhotoPath);

        // Simpan data ke dalam tabel
        $weddingInvitations = new weddingInvitations([
            'designId' => $validatedData['designId'],
            'userId' => $validatedData['userId'],
            'groomName' => $validatedData['groomName'],
            'brideName' => $validatedData['brideName'],
            'groomPhoto' => $groomPhotoUrl,
            'bridePhoto' => $bridePhotoUrl,
            'coverPhoto' => $coverPhotoUrl,
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

        // $invitationOrders = new invitationOrders([
        //     'designId' => $validatedDataOrder['designId'],
        //     'userId' => $validatedDataOrder['userId'],
        //     'invitationId' => $validatedDataOrder['invitationId'],
        //     'orderDate' => $validatedDataOrder['orderDate'],
        //     'orderExpired' => $validatedDataOrder['orderExpired'],
        //     'totalPrice' => $validatedDataOrder['totalPrice'],
        //     'orderStatus' => $validatedDataOrder['orderStatus'],
        // ]);

        // $invitationOrders->save();

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
            $groomPhotoPath = $groomPhoto->getClientOriginalName();
        }

        if ($bridePhoto) {
            $bridePhotoPath = $bridePhoto->getClientOriginalName();
        }

        if ($coverPhoto) {
            $coverPhotoPath = $coverPhoto->getClientOriginalName();
        }

        $groomPhoto->storeAs('public/weddingInvitationPhoto/mainPhoto', $groomPhotoPath);
        $bridePhoto->storeAs('public/weddingInvitationPhoto/mainPhoto', $bridePhotoPath);
        $coverPhoto->storeAs('public/weddingInvitationPhoto/mainPhoto', $coverPhotoPath);

        $groomPhotoUrl = Storage::url('public/weddingInvitationPhoto/mainPhoto/' . $groomPhotoPath);
        $bridePhotoUrl = Storage::url('public/weddingInvitationPhoto/mainPhoto/' . $bridePhotoPath);
        $coverPhotoUrl = Storage::url('public/weddingInvitationPhoto/mainPhoto/' . $coverPhotoPath);

        $weddingInvitations->update([
            'designId' => $validatedData['designId'],
            'userId' => $validatedData['userId'],
            'groomName' => $validatedData['groomName'],
            'brideName' => $validatedData['brideName'],
            'groomPhoto' => $groomPhotoUrl,
            'bridePhoto' => $bridePhotoUrl,
            'coverPhoto' => $coverPhotoUrl,
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
