<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run()
    {
        Role::query()->create(['role' => 'admin']);
        Role::query()->create(['role' => 'usager']);
    }
}
