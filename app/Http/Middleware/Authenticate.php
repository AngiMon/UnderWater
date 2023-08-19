<?php

namespace App\Http\Middleware;

use App\Http\Client\Ory\OryClient;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth as AuthSession;

class Authenticate extends Middleware
{
    public function __construct(Auth $auth)
    {
        parent::__construct($auth);
    }

    public function handle($request, \Closure $next, ...$guards)
    {
        if (null === AuthSession::user()) {
            return redirect(RouteServiceProvider::LOGIN);
        }

        return $next($request);
    }
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('sign-in');
    }
}
