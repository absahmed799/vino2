<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListeAchat extends Model
{
    protected $table = 'liste_achats';
    protected $fillable = ['bouteille_id', 'quantity'];

    public function bouteille()
    {
        return $this->belongsTo(Bouteille::class);
    }

    // Define other relationships or additional methods here
}
