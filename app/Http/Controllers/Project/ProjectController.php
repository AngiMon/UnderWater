<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Models\Project;
use App\Models\State;
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

        $stateTodo = new State();
        $stateTodo->label = "À faire";
        $stateTodo->value = "todo";
        $stateTodo->position = 1;
        $stateTodo->project_id = $project->id;
        $stateTodo->save();

        $stateInProgress = new State();
        $stateInProgress->label = "En cours";
        $stateInProgress->value = "in_progress";
        $stateInProgress->position = 2;
        $stateInProgress->project_id = $project->id;
        $stateInProgress->save();

        $stateDone = new State();
        $stateDone->label = "Terminé";
        $stateDone->value = "done";
        $stateDone->position = 3;
        $stateDone->project_id = $project->id;
        $stateDone->save();

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
            'states' => $project->states()->getResults(),
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
