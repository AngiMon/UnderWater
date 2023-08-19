<?php

namespace App\Http\Controllers\Auth;


use App\Http\Client\Ory\OryClient;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AuthController
{
    public function __construct(
        readonly OryClient $client,
        readonly UserRepository $userRepository,
    ) {
    }

    public function login(): Response
    {
        return Inertia::render('Auth/SignIn');
    }

    public function logout(): RedirectResponse
    {
        if (null !== ($user = Auth::user())) {
            $this->client->revoke($user->ory_token);
            $this->userRepository->update($user->email, ['ory_token' => null]);

            Auth::logout();
        }

        return Redirect::route('home');
    }
}
