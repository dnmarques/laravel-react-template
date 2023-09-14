<?php

namespace YourProject\YourDomain\Actions;

use YourProject\YourDomain\Models\Task;

class DeleteTaskAction
{
    public function execute(Task $task): bool
    {
        return $task->delete();
    }
}
