<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weddingPhotos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invitationId');
            $table->string('photo');
            $table->string('photoInformation')->nullable();
            $table->timestamps();

            $table->foreign('invitationId')->references('id')->on('weddingInvitations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weddingPhotos');
    }
};
