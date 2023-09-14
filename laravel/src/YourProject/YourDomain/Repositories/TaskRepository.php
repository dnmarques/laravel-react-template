<?php

namespace YourProject\YourDomain\Repositories;

use Illuminate\Support\Collection;
use YourProject\YourDomain\Models\Task;
use YourProject\YourDomain\Data\TaskRepositoryFilterData;

class TaskRepository
{
    public function __construct() {}

    public function get(TaskRepositoryFilterData $filters): Collection
    {
        $query = Task::query();

        if (!is_null($filters->user)) {
            $query->where('user_id', $filters->user->id);
        }

        if (!is_null($filters->goal)) {
            $query->where('goal_id', $filters->goal->id);
        }

        if (!is_null($filters->completed)) {
            $filters->completed
                ? $query->whereNotNull('completed_at')
                : $query->whereNull('completed_at');
        }

        if (!is_null($filters->date)) {
            $query->where('date', $filters->date->toDateString());
        }

        return $query->get();
    }
}
