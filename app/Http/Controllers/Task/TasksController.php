<?php

declare(strict_types=1);

namespace App\Http\Controllers\Task;

use Inertia\Inertia;
use Inertia\Response;

class TasksController extends AbstractTaskController
{
    public function __invoke(): Response
    {
        return Inertia::render('Task/ListTasks', [
            'tasks' => $this->taskRepository->list(),
        ]);
    }
}
