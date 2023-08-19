<?php

namespace App\Http\Controllers\Task;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Resources\Task\TaskResource;

class UpdateTaskController extends AbstractTaskController
{
    public function __invoke(StoreTaskRequest $request, int $id): TaskResource
    {
        $this->taskRepository->update($id, $request->toArray());

        return new TaskResource($this->taskRepository->find($id));
    }
}
