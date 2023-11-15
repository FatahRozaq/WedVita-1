<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\invitationOrdersRequest;
use App\Models\invitationOrders;
use App\Models\User;
use App\Models\invitationDesigns;
use App\Models\weddingInvitations;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class invitationOrdersController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('userId');
        $orders = invitationOrders::query();

        $orders->when($userId, function($query) use ($userId){
            return $query->where('userId', '=', $userId);
        });

        return response()->json([
            'status' => 'success',
            'data' => $orders->get()
        ]);

    }

    public function create(Request $request)
    {
        $userId = $request->input('userId');
        $designId = $request->input('designId');
        $invitationId = $request->input('invitationId');

        $design = invitationDesigns::find($designId);
        $invitation = weddingInvitations::find($invitationId);
        $user = User::find($userId);
        
        $order = invitationOrders::create([
            'invitationId' => $invitationId,
            'userId' => $userId,
            'designId' => $designId,
        ]);

        $transactionDetails = [
            'order_id' => $order->id.'-'.Str::random(5),
            'gross_amount' => $design->price,
        ];

        $itemDetails = [
            [
                'id' => $design->id,
                'price' => $design->price,
                'quantity' => 1,
                'name' => $design->designName,
                'brand' => 'WedVita',
                'category' => 'Invitation'
            ]
        ];

        $customerDetails = [
            'first_name' => $user->name,
            'email' => $user->email
        ];

        $midtransParams = [
            'transaction_details' => $transactionDetails,
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails
        ];

        $midtransSnapUrl = $this->getMidtransSnapUrl($midtransParams);

        $order->snapUrl = $midtransSnapUrl;

        $order->metadata = [
            'design_id' => $design->id,
            'price' => $design->price,
            'design_name' => $design->designName,
            'invitation' => $invitation->id,
            'groom_name' => $invitation->groomName,
            'bride_name' => $invitation->brideName
        ];

        $order->save();
        return response()->json([
            'status' => 'success',
            'data' => $order,
        ]);

        // return $midtransSnapUrl;
        // return response()->json([
        //     'message' => 'Semua data invitation design',
        //     'invitationOrders' => $order,
        // ], 200);
    }

    private function getMidtransSnapUrl($params)
    {
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = (bool) env('MIDTRANS_PRODUCTION');
        // \Midtrans\Config::$isSanitized = x  ;
        \Midtrans\Config::$is3ds = (bool) env('MIDTRANS_3DS');

        $snapUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;
        return $snapUrl;
    }

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
