<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepository
{
    public function store(User $user)
    {
        return tap($user)->save();
    }
    public function findOne(string $email): Model|Collection|Builder|array|null
    {
        return User::query()->where(['email' => $email])->first();
    }
    public function update(string $email, array $data): int
    {
        return User::query()->where(['email' => $email])->update($data);
    }
}
