<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Client\Ory\OryClient;
use App\Models\Task;
use App\Models\User;
use App\Repositories\UserRepository;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HomeController
{
    public function __construct(
        readonly OryClient $client,
        readonly UserRepository $userRepository,
    ) {
    }

    /**
     * @throws GuzzleException
     */
    public function __invoke(Request $request): Response
    {
        if (null === ($user = Auth::user())) {
            if (null === ($code = $request->query->get('code'))
                || null === ($authorizationCode = $this->client->token($code))
            ) {
                return Inertia::render('Auth/SignIn');
            }

            $userInfo = $this->client->userInfo($token = $authorizationCode->access_token);
            if ( null === $this->userRepository->findOne($email = $userInfo->email)) {
                $newUser = new User();
                $newUser->email = $email;
                $newUser->name = $userInfo->family_name;
                $newUser->firstname = $userInfo->given_name;
                $newUser->role = RolesEnum::ADMIN;
                $newUser->ory_token = $token;

                $this->userRepository->store($newUser);
            } else {
                $this->userRepository->update($email, ['ory_token' => $token]);
            }

            $user = $this->userRepository->findOne($email);
        }

        Auth::loginUsingId($user->id);
        $request->session()->regenerate();

        return Inertia::render('Home', [
            'tasks' => Task::all(),
            'user' => $user,
        ]);
    }
}
