<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $users = \App\Models\User::factory(5)->create();

         $users[] = \App\Models\User::factory()->create([
             'name' => 'Merle',
             'firstname' => 'Ludivine ',
             'email' => 'angmonate@gmail.com',
             'role' => 'admin'
         ]);

        \App\Models\Project::factory(3)
            ->hasAttached($users)
            ->create();

        \App\Models\Task::factory(10)->create();
    }
}
