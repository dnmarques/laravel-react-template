<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'Diogo Marques',
                'email' => 'diogo@incrivel.pt',
                'email_verified_at' => NULL,
                'password' => '$2y$10$BZmH7e1kRmw19QPOEn9IJuSDgzaSi1RN.DTBXwluzNYzE95wozArS',
                'remember_token' => NULL,
                'created_at' => '2023-03-08 20:21:08',
                'updated_at' => '2023-03-08 20:21:08',
            ],
        ]);
    }
}
