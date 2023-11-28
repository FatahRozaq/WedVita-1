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
        'price',
        'designLink',
    ];

    public function weddingInvitations() {
        return $this->belongsTo(weddingInvitations::class);
    }
}
