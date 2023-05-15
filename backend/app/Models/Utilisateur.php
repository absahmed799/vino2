<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    protected $table = 'utilisateurs';
    protected $fillable = ['name', 'email', 'role_id'];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Define other relationships or additional methods here

     public function celliers()
    {
        return $this->hasMany(Cellier::class, 'utilisateur_id');
    }
}
