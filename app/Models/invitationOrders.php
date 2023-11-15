<?php

namespace App\Models;

use App\Models\weddingInvitations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class invitationOrders extends Model
{
    protected $table = 'invitationOrders';
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
        'orderStatus',
        'snapUrl',
        'metadata',
     ];

     protected $casts = [
         'created_at' => 'datetime:Y-m-d H:m:s',
         'updated_at' => 'datetime:Y-m-d H:m:s',
         'metadata' => 'array'
     ];

    public function weddingInvitation()
    {
        return $this->belongsTo(weddingInvitations::class, 'invitationId', 'id');
    }
}
