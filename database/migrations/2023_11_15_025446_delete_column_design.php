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
        Schema::table('invitationDesigns', function (Blueprint $table) {
            $table->dropColumn('designDummy');
            $table->dropColumn('designCode');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitationDesigns', function (Blueprint $table) {
            $table->addColumn('tipe_data', 'nama_kolom');
        });
    }
};
