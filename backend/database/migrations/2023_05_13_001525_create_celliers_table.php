<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCelliersTable extends Migration
{
    public function up()
    {
        Schema::create('celliers', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->unsignedBigInteger('utilisateur_id');
            $table->timestamps();

            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs');
        });
    }

    public function down()
    {
        Schema::dropIfExists('celliers');
    }
}