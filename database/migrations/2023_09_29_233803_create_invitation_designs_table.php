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
        Schema::create('invitationDesigns', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId');
            $table->string('designName');
            $table->text('designDescription')->nullable();
            $table->string('designImage')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('designLink')->unique();
            $table->timestamps();

            // Menambahkan foreign key constraint
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitationDesigns');
    }
};
