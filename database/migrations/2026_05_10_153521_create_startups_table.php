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
        Schema::create('startups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('mission')->nullable();
            $table->string('logo_url')->nullable();
            $table->decimal('funding_amount', 15, 2)->default(0);
            $table->string('funding_stage'); // pre-seed, seed, series-a, series-b, series-c, late-stage
            $table->string('funding_label')->nullable(); // e.g. "SERIES A TRENDING", "HIGH GROWTH POTENTIAL"
            $table->string('sector');
            $table->string('hq_location');
            $table->date('founding_date')->nullable();
            $table->string('burn_rate')->nullable(); // low, medium, high
            $table->string('website_url')->nullable();
            $table->decimal('total_funding', 15, 2)->default(0);
            $table->boolean('is_featured')->default(false);
            $table->integer('week_number');
            $table->integer('year');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('startups');
    }
};
