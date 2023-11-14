<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class guestMessages extends Model
{
    protected $table = 'guestMessages';
    use HasFactory;

    protected $fillable = [
        'invitationId',
        'guestName',
        'message'
    ];

    public function weddingInvitations()
    {
        return $this->belongsTo(weddingInvitations::class, 'invitationId');
    }


}
