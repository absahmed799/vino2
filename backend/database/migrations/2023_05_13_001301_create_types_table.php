<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTypesTable extends Migration
{
    public function up()
    {
        Schema::create('types', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
        });

        // Insérer les valeurs prédéfinies dans la table
        DB::table('types')->insert([
            ['nom' => 'Vin rouge'],
            ['nom' => 'Vin blanc'],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('types');
    }
}