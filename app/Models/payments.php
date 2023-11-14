<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class payments extends Model
{
    protected $table = 'payments';
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

     protected $fillable = [
        'paymentStatus',
        'paymentMethod',
        'raw_response',
        'orderId'
     ];

     protected $casts = [
         'created_at' => 'datetime:Y-m-d H:m:s',
         'updated_at' => 'datetime:Y-m-d H:m:s',
     ];
}
