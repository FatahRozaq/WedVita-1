<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class weddingPhotos extends Model
{   

    protected $table = 'weddingPhotos';
    use HasFactory;
    protected $fillable = [
        'invitationId',
        'photo',
        'photoInformation',
    ];

    public function weddingInvitations()
    {
        return $this->belongsTo(weddingInvitations::class, 'invitationId');
    }
}
