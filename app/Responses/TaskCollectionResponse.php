<?php

declare(strict_types=1);

namespace App\Responses;

use App\Http\Resources\Task\TaskCollection;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

final class TaskCollectionResponse implements Responsable
{
    public function __construct(
        private readonly TaskCollection $taskCollection,
        private readonly int $status,
    ) {
    }

    public function toResponse($request): JsonResponse
    {
        return response()->json(
            data: $this->taskCollection,
            status: $this->status,
        );
    }
}
