<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListeAchat extends Model
{
    protected $table = 'liste_achats';
    protected $fillable = ['bouteille_id', 'quantite', 'utilisateur_id'];

    public function bouteille()
    {
        return $this->belongsTo(Bouteille::class);
    }
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }
    // Define other relationships or additional methods here
}
