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
        Schema::table('startups', function (Blueprint $table) {
            $table->string('competition')->nullable()->after('description');
            $table->string('registration_type')->nullable()->after('funding_stage');
            $table->string('certificate_number')->nullable()->after('registration_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('startups', function (Blueprint $table) {
            $table->dropColumn(['competition', 'registration_type', 'certificate_number']);
        });
    }
};
