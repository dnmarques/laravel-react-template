<?php

namespace YourProject\Support;

use Ramsey\Uuid\Uuid;
use Illuminate\Support\Str;
use Ramsey\Uuid\UuidInterface;

class Help
{
    public static function uuidFromStringOrNew(string $string = null): UuidInterface
    {
        return Str::isUuid($string) ? Uuid::fromString($string) : Str::uuid();
    }
}
