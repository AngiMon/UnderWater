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
//         $users = \App\Models\User::factory(5)->create();
//
//         $users[] = \App\Models\User::factory()->create([
//             'name' => 'Merle',
//             'firstname' => 'Ludivine ',
//             'email' => 'angmonate@gmail.com',
//             'role' => 'admin'
//         ]);
         \App\Models\State::factory()->create(
             [
                 'label' => "À faire",
                 'value' => 'todo ',
                 'position' => 1,
                 'project_id' => 1
             ]);
             \App\Models\State::factory()->create([
                 'label' => "En cours",
                 'value' => 'in_progress ',
                 'position' => 2,
                 'project_id' => 1
             ]);
        \App\Models\State::factory()->create([
                 'label' => "Terminé",
                 'value' => 'done ',
                 'position' => 3,
                 'project_id' => 1
             ]);
        \App\Models\State::factory()->create([
                 'label' => "À faire",
                 'value' => 'todo ',
                 'position' => 1,
                 'project_id' => 2
             ]);
        \App\Models\State::factory()->create([
                 'label' => "En cours",
                 'value' => 'in_progress ',
                 'position' => 2,
                 'project_id' => 2
             ]);
        \App\Models\State::factory()->create([
                 'label' => "Terminé",
                 'value' => 'done ',
                 'position' => 3,
                 'project_id' => 2
             ]);

//        \App\Models\Project::factory(3)
//            ->hasAttached($users)
//            ->create();
//
//        \App\Models\Task::factory(10)->create();
    }
}
