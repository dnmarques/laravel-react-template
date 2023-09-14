<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use YourProject\YourDomain\Models\Task;
use YourProject\YourDomain\Data\CreateTaskData;
use YourProject\YourDomain\Actions\EditTaskAction;
use YourProject\YourDomain\Actions\CreateTaskAction;
use YourProject\YourDomain\Actions\DeleteTaskAction;
use YourProject\YourDomain\Actions\CompleteTaskAction;
use YourProject\YourDomain\Repositories\TaskRepository;
use YourProject\YourDomain\Data\TaskRepositoryFilterData;

class TaskController extends Controller
{
    public function __construct(
        public CompleteTaskAction $completeTaskAction,
        public CreateTaskAction $createTaskAction,
        public DeleteTaskAction $deleteTaskAction,
        public EditTaskAction $editTaskAction,
        public TaskRepository $taskRepository
    ){}

    public function index(Request $request)
    {
        $tasks = $this->taskRepository->get(new TaskRepositoryFilterData(
            user: $request->user(),
            date: $request->input('date') ? Carbon::parse($request->input('date')) : null,
        ));
        return TaskResource::collection($tasks);
    }

    public function create(Request $request)
    {
        $request->validate([
            'uuid' => 'uuid',
            'text' => 'required|string',
            'date' => 'date',
        ]);

        $this->authorizeForUser($request->user(), 'create', Task::class);

        $task = $this->createTaskAction->execute(CreateTaskData::fromRequest($request));

        return new TaskResource($task);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'text' => 'required|string',
            'date' => 'date',
        ]);

        $this->authorizeForUser($request->user(), 'update', $task);

        $task = $this->editTaskAction->execute(
            $task,
            $request->text,
            $request->input('date') ? Carbon::parse($request->date) : null,
        );

        return new TaskResource($task);
    }

    public function complete(Request $request, Task $task)
    {
        $this->authorizeForUser($request->user(), 'complete', $task);

        $task = $this->completeTaskAction->execute($task);

        return new TaskResource($task);
    }

    public function delete(Request $request, Task $task)
    {
        $this->authorizeForUser($request->user(), 'delete', $task);

        $this->deleteTaskAction->execute($task);

        return response()->noContent();
    }
}
