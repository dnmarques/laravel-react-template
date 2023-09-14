<?php

namespace YourProject\Support;

use Illuminate\Support\Facades\Config;

class Frontend
{

    public function __construct()
    {
    }

    public static function login(): string
    {
        return self::url('login');
    }

    public static function register(): string
    {
        return self::url('register');
    }

    private static function url(string $path): string
    {
        $baseUrl = Config::get('frontend.url');
        return "$baseUrl/$path";
    }
}
