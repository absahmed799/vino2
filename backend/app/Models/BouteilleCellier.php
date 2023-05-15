<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BouteilleCellier extends Model
{
    protected $table = 'bouteilles_celliers';
    protected $fillable = ['bouteille_id', 'cellier_id', 'quantity'];

    public function bouteille()
    {
        return $this->belongsTo(Bouteille::class);
    }

    public function cellier()
    {
        return $this->belongsTo(Cellier::class);
    }

    // Define other relationships or additional methods here
}