<?php 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignalerTable extends Migration
{
    public function up()
    {
        Schema::create('signalers', function (Blueprint $table) {
            $table->id();
            $table->string('titre_erreur');
            $table->text('description_erreur');
            $table->unsignedBigInteger('utilisateur_id');
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('signaler');
    }
}