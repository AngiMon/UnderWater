<?php

namespace App\Repositories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ProjectRepository
{
    public function find(int $id): Model|Collection|Builder|array|null
    {
        return Project::query()->find($id);
    }

    public function list(User $user): Collection|array
    {
        return Project::query()->get();
    }

    public function store(Project $task, User $user): Project
    {
        return tap($task)->save();
    }

    public function update(int $id, array $values): bool|int
    {
        return Project::query()->find($id)->update($values);
    }

    public function destroy(int $id): bool|int
    {
        return Project::destroy($id);
    }
}
