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
        Schema::create('personal_information', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("first_name");
            $table->string("last_name");
            $table->string("email")->unique();
            $table->string("phone_number");
            $table->string("country");
            $table->string("city")->nullable();
            $table->string("address")->nullable();
            $table->date("date_of_birth")->nullable();
            $table->string("profile_picture")->nullable();
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_information');
    }
};
