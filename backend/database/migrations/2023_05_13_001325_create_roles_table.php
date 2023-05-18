<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('role');
        });

        // Insérer les valeurs prédéfinies dans la table
        DB::table('roles')->insert([
            ['role' => 'admin'],
            ['role' => 'utilisateur'],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
