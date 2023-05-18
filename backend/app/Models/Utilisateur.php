<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role;
use App\Models\Cellier;



class Utilisateur extends User
{
    protected $table = 'utilisateurs';
    protected $fillable = ['nom', 'courriel', 'mot_de_passe','role_id'];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Définissez ici des relations ou des méthodes supplémentaires

     public function celliers()
    {
        return $this->hasMany(Cellier::class, 'utilisateur_id');
    }
}
