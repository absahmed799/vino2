<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Signaler extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre_erreur',
        'description_erreur',
        'utilisateur_id',
    ];

    // Define the relationship with the Utilisateur model
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}