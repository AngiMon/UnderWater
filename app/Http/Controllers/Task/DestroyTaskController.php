<?php

namespace App\Http\Controllers\Task;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class DestroyTaskController extends AbstractTaskController
{
    public function __invoke(int $id): JsonResponse
    {
        return response()->json(
            data: ['deleted' => $this->taskRepository->destroy($id)],
            status: ResponseAlias::HTTP_NO_CONTENT
        );
    }
}
