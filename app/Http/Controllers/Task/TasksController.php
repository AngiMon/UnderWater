<?php

declare(strict_types=1);

namespace App\Http\Controllers\Task;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TasksController extends AbstractTaskController
{
    public function index(): Response
    {
        return Inertia::render('Task/ListTasks', [
            'tasks' => $this->taskRepository->list(),
        ]);
    }
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $userId = Auth::user()->getAuthIdentifier();

        $task = new Task();
        $task->title = $request->title;
        $task->user_id = $userId;
        $task->project_id = $request->project_id;
        $task->state_id = 1; //todo remove
        $task->position = Task::query()->where('project_id', "=", $request->project_id)->count() + 1;
        $task->save();

        return redirect()->back();
    }

    public function manyUpdate(Request $request): RedirectResponse
    {
        foreach ($request->tasks as $task) {
            Task::query()->where('id', '=', $task['id'])->update([
                'position' => $task['position'],
                'state_id' => $task['state_id'],
            ]);
        }

        return redirect()->back();
    }
}
