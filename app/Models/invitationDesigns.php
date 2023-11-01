<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invitationDesigns extends Model
{
    protected $table = 'invitationDesigns';
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'userId',
        'designName',
        'designDescription',
        'designImage',
        'designDummy',
        'designCode',
        'price',
        'designLink',
    ];

    public function weddiingInvitations() {
        return $this->belongsTo(weddingInvitations::class);
    }
}
