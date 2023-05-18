<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Types extends Model
{
    protected $table = 'types';
    protected $fillable = ['nom'];
    public $timestamps = false;

    // Define relationships or additional methods here
}
