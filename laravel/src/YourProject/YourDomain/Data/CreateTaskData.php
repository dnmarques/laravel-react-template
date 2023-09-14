<?php

namespace YourProject\YourDomain\Data;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use YourProject\Support\Help;
use Ramsey\Uuid\UuidInterface;

class CreateTaskData
{
    public function __construct(
        public readonly UuidInterface $uuid,
        public readonly User $user,
        public readonly string $text,
        public readonly ?string $description = null,
        public readonly ?Carbon $date = null,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            Help::uuidFromStringOrNew($request->input('uuid')),
            $request->user(),
            $request->input('text'),
            $request->input('description'),
            $request->input('date') ? Carbon::parse($request->input('date')) : null,
        );
    }

    public static function fromArray(array $task): self
    {
        return new self(
            Help::uuidFromStringOrNew($task['id'] ?? null),
            $task['user'],
            $task['text'],
            $task['description'] ?? null,
            $task['date'] ?? null,
            $task['goal_id'] ?? null,
        );
    }
}
