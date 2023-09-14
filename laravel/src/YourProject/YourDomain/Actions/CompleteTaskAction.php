<?php

namespace YourProject\YourDomain\Actions;

use Carbon\Carbon;
use YourProject\YourDomain\Models\Task;

class CompleteTaskAction
{
    public function execute(Task $task): Task
    {
        if (!$this->isTaskCompleted($task)) {
            return $this->completeTask($task);
        }
        return $this->uncompleteTask($task);
    }

    private function isTaskCompleted(Task $task): bool
    {
        return !is_null($task->completed_at);
    }

    private function completeTask(Task $task): Task
    {
        $task->update([
            'completed_at' => Carbon::now(),
        ]);
        return $task;
    }

    private function uncompleteTask(Task $task): Task
    {
        $task->update([
            'completed_at' => null
        ]);
        return $task;
    }
}
