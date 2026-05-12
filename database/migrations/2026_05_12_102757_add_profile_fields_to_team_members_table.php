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
        Schema::table('team_members', function (Blueprint $table) {
            $table->text('bio')->nullable()->after('role');
            $table->string('twitter_url')->nullable()->after('photo_url');
            $table->string('linkedin_url')->nullable()->after('twitter_url');
            $table->string('github_url')->nullable()->after('linkedin_url');
            $table->boolean('is_founder')->default(false)->after('startup_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('team_members', function (Blueprint $table) {
            $table->dropColumn(['bio', 'twitter_url', 'linkedin_url', 'github_url', 'is_founder']);
        });
    }
};
