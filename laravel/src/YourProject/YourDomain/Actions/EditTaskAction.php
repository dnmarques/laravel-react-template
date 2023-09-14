<?php

namespace YourProject\YourDomain\Actions;

use Carbon\Carbon;
use YourProject\YourDomain\Models\Task;

class EditTaskAction
{
    public function __construct(
    ) {
    }

    public function execute(Task $task, string $text, ?Carbon $date = null): Task
    {
        $task->update([
            'text' => $text,
            'date' => $date,
        ]);
        return $task;
    }
}
