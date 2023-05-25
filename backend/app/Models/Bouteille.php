<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Types;
use App\Models\Pays;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bouteille extends Model
{
    protected $table = 'bouteilles';
    protected $fillable = ['bouteille_nom', 'image_url', 'code_SAQ', 'description', 'prix_saq', 'saq_url', 'format', 'type_id', 'pays_id', 'utilisateur_id'];

    public function type(): BelongsTo
    {
        return $this->belongsTo(Types::class, 'type_id');
    }

    public function pays(): BelongsTo
    {
        return $this->belongsTo(Pays::class, 'pays_id');
    }
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

    // Define other relationships or additional methods here

    public function celliers(): BelongsToMany
    {
        return $this->belongsToMany(Cellier::class, 'bouteilles_celliers')
            ->withPivot([
                'millesime',
                'quantite',
                'date_achat',
                'garde_jusqua',
                'note',
            ])->withTimestamps();
    }
}



