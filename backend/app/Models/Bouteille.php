<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteille extends Model
{
    protected $table = 'bouteilles';
    protected $fillable = ['name', 'type_id', 'country_id'];

    public function type()
    {
        return $this->belongsTo(Types::class);
    }

    public function country()
    {
        return $this->belongsTo(Pays::class, 'country_id');
    }

    // Define other relationships or additional methods here
}
