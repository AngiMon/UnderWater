<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class TaskRepository
{
    public function find(int $id): Model|Collection|Builder|array|null
    {
        return Task::query()->find($id);
    }

    public function list(): Collection|array
    {
        return Task::query()->get();
    }

    public function store(Task $task): Task
    {
        return tap($task)->save();
    }

    public function update(int $id, array $values): bool|int
    {
        return Task::query()->find($id)->update($values);
    }

    public function destroy(int $id): bool|int
    {
        return Task::destroy($id);
    }
}
