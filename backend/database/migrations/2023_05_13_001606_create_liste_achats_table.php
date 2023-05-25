<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListeAchatsTable extends Migration
{
    public function up()
    {
        Schema::create('liste_achats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id');
            $table->unsignedBigInteger('bouteille_id');
            $table->integer('quantite')->nullable();
            $table->timestamps();

            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs');
            $table->foreign('bouteille_id')->references('id')->on('bouteilles');
        });
    }

    public function down()
    {
        Schema::dropIfExists('liste_achats');
    }
}