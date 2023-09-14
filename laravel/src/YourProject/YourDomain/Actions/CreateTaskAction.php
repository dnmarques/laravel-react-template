<?php

namespace YourProject\YourDomain\Actions;

use YourProject\YourDomain\Models\Task;
use YourProject\YourDomain\Data\CreateTaskData;

class CreateTaskAction
{
    public function __construct(
    ) {
    }

    public function execute(CreateTaskData $data): Task
    {
        return Task::create([
            'uuid' => $data->uuid,
            'user_id' => $data->user->id,
            'text' => $data->text,
            'description' => $data->description ?? '',
            'date' => $data->date,
        ]);
    }
}
