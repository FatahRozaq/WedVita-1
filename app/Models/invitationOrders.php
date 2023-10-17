<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invitationOrders extends Model
{
    protected $table = 'weddingInvitations';
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

     protected $fillable = [
        'invitationId',
        'designId',
        'userId',
        'orderDate',
        'orderExpired',
        'totalPrice',
        'orderStatus',
     ];
}
