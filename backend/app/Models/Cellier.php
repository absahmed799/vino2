<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cellier extends Model
{
    protected $table = 'celliers';
    protected $fillable = ['name'];

    // Define relationships or additional methods here
}