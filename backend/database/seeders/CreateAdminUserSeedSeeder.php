<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Utilisateur;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateAdminUserSeedSeeder extends Seeder
{
    public function run()
    {
        $role = Role::where('role', 'admin')->first();

        if (!is_null($role)) {
            $role->utilisateurs()->create([
                'nom' => 'Admin',
                'courriel' => 'admin@admin.com',
                'mot_de_passe' => Hash::make('admin'),
            ]);

            User::query()->create([
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin')
            ]);
        }

    }
}
