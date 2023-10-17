<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\invitationOrdersRequest;
use App\Models\invitationOrders;
use Illuminate\Http\Request;

class invitationOrdersController extends Controller
{
    public function store(invitationOrdersRequest $request)
    {
        $validatedData = $request->validated();

        $invitationOrders = new invitationOrders([
            'designId' => $validatedData['designId'],
            'userId' => $validatedData['userId'],
            'invitationId' => $validatedData['invitationId'],
            'orderDate' => $validatedData['orderDate'],
            'orderExpired' => $validatedData['orderExpired'],
            'totalPrice' => $validatedData['totalPrice'],
            'orderStatus' => $validatedData['orderStatus'],
        ]);

        $invitationOrders->save();

        return response()->json([
            'message' => 'Data wedding invitation berhasil disimpan',
            'invitationOrders' => $invitationOrders,
        ], 201);
    }

    public function update(invitationOrdersRequest $request, invitationOrders $invitationOrders)
    {
        $validatedData = $request->validated();

        $invitationOrders->update([
            'designId' => $validatedData['designId'],
            'userId' => $validatedData['userId'],
            'invitationId' => $validatedData['invitationId'],
            'orderDate' => $validatedData['orderDate'],
            'orderExpired' => $validatedData['orderExpired'],
            'totalPrice' => $validatedData['totalPrice'],
            'orderStatus' => $validatedData['orderStatus'],
        ]);

        return response()->json([
            'message' => 'Data wedding invitation berhasil diperbarui',
            'invitationOrders' => $invitationOrders,
        ], 200);
    }


    public function destroy(invitationOrders $invitationOrders)
    {
        $invitationOrders->delete();

        return response()->json([
            'message' => 'Data wedding invitation berhasil dihapus',
        ], 200);
    }

}
