<?php

use App\Models\Project;
use App\Models\State;
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
        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('value');
            $table->integer('position')->default(1);
            $table->boolean('visible')->default(true);
            $table->foreignIdFor(Project::class, 'project_id');
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->foreignIdFor(State::class, 'state_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('states', function (Blueprint $table) {
            Schema::dropIfExists('states');
        });
    }
};
