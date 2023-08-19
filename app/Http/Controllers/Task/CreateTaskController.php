<?php

namespace App\Http\Controllers\Task;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class CreateTaskController extends AbstractTaskController
{
    public function __invoke(StoreTaskRequest $request): TaskResource
    {
        $userId = Auth::user()->getAuthIdentifier();

        $task = new Task();
        $task->title = $request->title;
        $task->content = $request->content;
        $task->user_id = $userId;

        return new TaskResource($this->taskRepository->store($task));
    }
}
