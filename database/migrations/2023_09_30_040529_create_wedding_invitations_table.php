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
        Schema::create('weddingInvitations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('designId');
            $table->unsignedBigInteger('userId');
            $table->string('groomName');
            $table->string('brideName');
            $table->string('groomPhoto')->nullable();
            $table->string('bridePhoto')->nullable();
            $table->string('coverPhoto')->nullable();
            $table->date('weddingDate');
            $table->time('weddingTime');
            $table->string('weddingMap')->nullable();
            $table->string('weddingLocation');
            $table->string('fatherOfGroom');
            $table->string('motherOfGroom');
            $table->string('fatherOfBride');
            $table->string('motherOfBride');
            $table->string('accountNumber');
            $table->timestamps();

            $table->foreign('designId')->references('id')->on('invitationDesigns');
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weddingInvitations');
    }
};
