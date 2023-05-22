<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateursTable extends Migration
{
    public function up()
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('courriel')->unique();
            $table->string('mot_de_passe');
            $table->unsignedBigInteger('role_id');
            $table->timestamps();

            $table->foreign('role_id')->references('id')->on('roles');
        });

        // Insérer les valeurs prédéfinies dans la table
        DB::table('utilisateurs')->insert([
            'nom' => 'Admin',
            'courriel' => 'admin@example.com',
            'mot_de_passe' => \Illuminate\Support\Facades\Hash::make('50505'),
            'role_id' => 1,
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('utilisateurs');
    }
}
