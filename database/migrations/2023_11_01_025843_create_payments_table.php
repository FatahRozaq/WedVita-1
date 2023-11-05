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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('orderId');
            $table->string('paymentMethod');
            $table->string('cardNumber');
            $table->date('paymentDate');
            $table->double('paymentTotal', 8, 2);
            $table->string('paymentStatus');
            $table->timestamps();

            $table->foreign('orderId')->references('id')->on('weddingInvitations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
