<?php

namespace Database\Seeders;

use App\Models\Layout;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->count(5)->hasPersonalInformation(1)->create([
        //     'name' => 'Test User',
        // ]);
        Layout::factory()->count(3)->create();
    }
}
