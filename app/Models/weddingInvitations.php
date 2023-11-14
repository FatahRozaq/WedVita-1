<?php

namespace App\Models;

use App\Models\invitationOrders;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function order()
    {
        return $this->hasOne(invitationOrders::class, 'id', 'invitationId');
    }
}
