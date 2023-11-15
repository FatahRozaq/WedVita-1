<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\invitationOrders;
use App\Models\payments;
use App\Models\weddingInvitations;

class WebhookController extends Controller
{
    public function midtransHandler(Request $request)
    {
        $data = $request->all();

        $signatureKey = $data['signature_key'];

        $orderId = $data['order_id'];
        $statusCode = $data['status_code'];
        $grossAmount = $data['gross_amount'];
        $serverKey = env('MIDTRANS_SERVER_KEY');

        $mySignatureKey = hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);

        $transactionStatus = $data['transaction_status'];
        $type = $data['payment_type'];
        $fraudStatus = $data['fraud_status'];

        if ($signatureKey !== $mySignatureKey) {
            return response()->json([
                'status' => 'error',
                'message' => 'invalid signature'
            ], 400);
        }

        // return true;

        $realOrderId = explode('-', $orderId);
        $order = invitationOrders::find($realOrderId[0]);
        $weddingInvitation = $order->weddingInvitation;
        echo $realOrderId[0];
        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'order id not found'
            ], 404);
        }

        if ($order->orderStatus === 'success') {
            return response()->json([
                'status' => 'error',
                'message' => 'operation not permitted'
            ], 405);
        }

        if ($transactionStatus == 'capture'){
            if ($fraudStatus == 'challenge'){
                $order->orderStatus = 'challenge';
            } else if ($fraudStatus == 'accept'){
                $order->orderStatus = 'success';
                $weddingInvitation->status = 'success';
                $weddingInvitation->save();
            }
        } else if ($transactionStatus == 'settlement'){
            $order->orderStatus = 'success';
            $weddingInvitation->status = 'success';
            $weddingInvitation->save();
        } else if ($transactionStatus == 'cancel' ||
          $transactionStatus == 'deny' ||
          $transactionStatus == 'expire'){
            $order->orderStatus = 'failure';
        } else if ($transactionStatus == 'pending'){
            $order->orderStatus = 'pending';
        }

        $logData = [
            'paymentStatus' => $transactionStatus,
            'raw_response' => json_encode($data),
            'orderId' => $realOrderId[0],
            'paymentMethod' => $type
        ];

        payments::create($logData);
        $order->save();

        // if ($order->orderStatus === 'success') {
        //     createPremiumAccess([
        //         'user_id' => $order->user_id,
        //         'course_id' => $order->course_id
        //     ]);
        // }

        return response()->json('Ok');
    }
}
