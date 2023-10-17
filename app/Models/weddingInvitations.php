<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class weddingInvitations extends Model
{
    protected $table = 'weddingInvitations';
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'designId',
        'userId',
        'groomName',
        'brideName',
        'groomPhoto',
        'bridePhoto',
        'coverPhoto',
        'weddingDate',
        'weddingTime',
        'weddingMap',
        'weddingLocation',
        'fatherOfGroom',
        'motherOfGroom',
        'fatherOfBride',
        'motherOfBride',
        'accountNumber',
    ];

    public function design() {
        return $this->hasOne(invitationDesigns::class);
    }
}
