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
        Schema::create('invitationOrders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invitationId');
            $table->unsignedBigInteger('designId');
            $table->unsignedBigInteger('userId');
            $table->string('orderStatus')->default('pending');
            $table->string('snapUrl')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->foreign('invitationId')->references('id')->on('weddingInvitations');
            $table->foreign('designId')->references('id')->on('invitationDesigns');
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_orders');
    }
};
