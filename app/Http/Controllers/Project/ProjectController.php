<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Models\Project;
use App\Models\User;
use App\Repositories\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(
        readonly ProjectRepository $projectRepository,
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Project/ListProjects', [
            'projects' => Auth::user()->projects()->getResults(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Project/AddProject');
    }

    public function store(StoreProjectRequest $request)
    {
        $userId = Auth::user()->getAuthIdentifier();

        $project = new Project();
        $project->title = $request->title;
        $project->slug = $project->makeSlug($request->title);
        $project->description = $request->description;
        $project->owner_id = $userId;
        $project->save();
        $project->users()->attach([$userId]);

        return tap($project)->save();
    }

    public function show(Project $project)
    {
        //
    }

    public function edit(string $slug): Response
    {
        $project = Project::query()->where(['slug' => $slug])->firstOrFail();
        return Inertia::render('Project/EditProject', [
            'project' => $project,
            'tasks' => $project->tasks()->orderBy('position')->getResults(),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        //
    }

    public function destroy(Project $project)
    {
        //
    }
}
