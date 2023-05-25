<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBouteillesTable extends Migration
{
    public function up()
    {
        Schema::create('bouteilles', function (Blueprint $table) {
            $table->id();
            $table->string('bouteille_nom');
            $table->string('image_url')->nullable();
            $table->integer('code_SAQ');
            $table->string('description')->nullable();
            $table->float('prix_saq', 10, 2);
            $table->string('saq_url')->nullable();
            $table->string('format');
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('pays_id');
            $table->unsignedBigInteger('utilisateur_id');
            $table->timestamps();

            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs');
            $table->foreign('type_id')->references('id')->on('types');
            $table->foreign('pays_id')->references('id')->on('pays');
        });
    }

    public function down()
    {
        Schema::dropIfExists('bouteilles');
    }
}