<?php

namespace App\Policies;

use App\Models\User;
use YourProject\YourDomain\Models\Task;

class TaskPolicy
{
    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    public function delete(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    public function complete(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }
}
