<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Role;
use App\Models\Cellier;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'utilisateurs';

    protected string $email = 'courriel';
    protected string $password = 'mot_de_passe';
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
