<?php

namespace App\ViewModels;

use Illuminate\Http\Request;
use YourProject\Support\Frontend;
use Illuminate\Contracts\Support\Arrayable;

class HomeViewModel implements Arrayable
{
    public function __construct(
        public string $text,
        public string $loginUrl,
        public string $registerUrl,
    ) {}

    public static function fromRequest(Request $request): self
    {
        $frontend = new Frontend();
        return new self(
            "You're ready to build something awesome!",
            $frontend->login(),
            $frontend->register(),
        );
    }

    public function toArray(): array
    {
        return array_merge(
            get_object_vars($this),
            ['viewModel' => $this],
        );
    }
}
