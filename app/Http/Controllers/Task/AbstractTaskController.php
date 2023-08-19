<?php

declare(strict_types=1);

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;

abstract class AbstractTaskController extends Controller
{
    public function __construct(
        readonly protected TaskRepository $taskRepository
    ) {
    }
}
