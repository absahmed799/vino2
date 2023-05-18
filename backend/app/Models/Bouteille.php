<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Types;
use App\Models\Pays;

class Bouteille extends Model
{
    protected $table = 'bouteilles';
    protected $fillable = ['bouteille_nom', 'image_url', 'code_SAQ', 'description', 'prix_saq', 'saq_url', 'format', 'type_id', 'pays_id'];

    public function type(): BelongsTo
    {
        return $this->belongsTo(Types::class, 'type_id');
    }

    public function pays(): BelongsTo
    {
        return $this->belongsTo(Pays::class, 'pays_id');
    }

    // Define other relationships or additional methods here
}




    

    //public function type(): BelongsTo
    //{
    //    return $this->belongsTo(Types::class);
    //}
    //

    //public function country(): BelongsTo
    //{
    //    return $this->belongsTo(Pays::class, 'pays_id');
    //}

