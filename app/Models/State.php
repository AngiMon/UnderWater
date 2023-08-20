<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;

class State extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function project(): HasOne
    {
        return $this->hasOne(Project::class);
    }

    public function makeSlug(string $slug): Stringable
    {
        return Str::of($slug)->slug('-');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
