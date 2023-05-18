<?php

namespace Database\Seeders;

use App\Models\Types;
use Illuminate\Database\Seeder;

class CreateTypeSeeder extends Seeder
{
    public function run()
    {
        Types::create(['nom' => "Vin rouge"]);
        Types::create(['nom' => "Vin blanc"]);
    }
}
