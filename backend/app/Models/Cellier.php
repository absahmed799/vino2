<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Cellier extends Model
{
    protected $table = 'celliers';
    protected $fillable = ['nom','utilisateur_id'];

    // Définissez ici des relations ou des méthodes supplémentaires

     /**
     * Un cellier est lié à un utilisateur
     */
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

    public function bouteilles(): BelongsToMany
    {
        return $this->belongsToMany(Bouteille::class, 'bouteilles_celliers')
            ->withPivot([
                'millesime',
                'quantite',
                'date_achat',
                'note',
            ])->withTimestamps();
    }

}
