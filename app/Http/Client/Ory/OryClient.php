<?php

namespace App\Http\Client\Ory;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\ServerException;
use http\Exception\RuntimeException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\Uid\UuidV1;

class OryClient
{
    private string $clientSecret;
    private string $clientId;

    private Client $client;

    private string $baseUrl;

    public function __construct()
    {
        $this->clientSecret = config('services.ory.client_secret');
        $this->clientId = config('services.ory.client_id');
        $this->baseUrl = config('services.ory.base_uri');
        $this->client = new Client();
    }

    public function authenticate()
    {
        $response = $this->client->request(
            'GET',
            sprintf('%s/oauth2/admin/auth', $this->baseUrl),
            [
                'query' => [
                    'client_id' => $this->clientId,
                    'scope' => 'openid offline_access email',
                    'response_type' => 'code',
                    'redirect_uri' => 'http://localhost',
                    'state' => UuidV1::generate()
                ]
            ]
        );

        dd($response);

    }

    /**
     * @throws GuzzleException
     */
    public function token(string $code)
    {
        try {
            $response = $this->client->request(
                'POST',
                sprintf('%s/oauth2/token', $this->baseUrl),
                [
                    'form_params' => [
                        'code' => $code,
                        'grant_type' => 'authorization_code',
                        'redirect_uri' => 'http://localhost',
                        'client_id' => $this->clientId,
                        'client_secret' => $this->clientSecret,
                    ]
                ]
            );
        }catch (\Exception $exception) {
            return null;
        }


        return json_decode($response->getBody()->getContents());
    }

    public function userInfo(string $token)
    {
        try {
            $response = $this->client->request(
                'GET',
                sprintf('%s/userinfo', $this->baseUrl),
                [
                    'query' => [
                        'scope' => 'email profile'
                    ],
                    'headers' => [
                        'authorization' => "Bearer $token"
                    ]
                ]
            );
        } catch (\Exception|GuzzleException $exception) {
            //todo write exception in the log file
            return null;
        }

        return json_decode($response->getBody()->getContents());
    }

    public function revoke(string $token)
    {
        try {
            $response = $this->client->request(
                'POST',
                $this->baseUrl,
                [
                    'form_params' => [],
                    'headers' => [
                        'authorization' => "Bearer $token"
                    ]
                ]
            );
        } catch (\Exception|GuzzleException $exception) {
            //todo write exception in the log file
            return null;
        }
dd($response);
        return json_decode($response->getBody()->getContents());
    }
}
