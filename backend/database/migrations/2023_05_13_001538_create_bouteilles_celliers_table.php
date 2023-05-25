<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBouteillesCelliersTable extends Migration
{
    public function up()
    {
        Schema::create('bouteilles_celliers', function (Blueprint $table) {
            $table->id();
            $table->integer('millesime');
            $table->integer('quantite');
            $table->date('date_achat');
            $table->integer('garde_jusqua');
            $table->string('note')->nullable();
            $table->unsignedBigInteger('cellier_id');
            $table->unsignedBigInteger('bouteille_id');
            $table->timestamps();

            $table->foreign('cellier_id')->references('id')->on('celliers');
            $table->foreign('bouteille_id')->references('id')->on('bouteilles');
        });
    }

    public function down()
    {
        Schema::dropIfExists('bouteilles_celliers');
    }
}
