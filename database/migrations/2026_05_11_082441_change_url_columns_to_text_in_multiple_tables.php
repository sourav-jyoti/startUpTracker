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
            $table->text('logo_url')->nullable()->change();
            $table->text('website_url')->nullable()->change();
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->text('photo_url')->nullable()->change();
        });

        Schema::table('news_articles', function (Blueprint $table) {
            $table->text('thumbnail_url')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('startups', function (Blueprint $table) {
            $table->string('logo_url')->nullable()->change();
            $table->string('website_url')->nullable()->change();
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->string('photo_url')->nullable()->change();
        });

        Schema::table('news_articles', function (Blueprint $table) {
            $table->string('thumbnail_url')->nullable()->change();
        });
    }
};
