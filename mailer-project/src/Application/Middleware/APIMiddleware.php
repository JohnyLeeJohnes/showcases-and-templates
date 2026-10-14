<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use App\Application\Settings\SettingsInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpForbiddenException;

class APIMiddleware implements Middleware
{
    private string $apiKey;

    public function __construct(SettingsInterface $settings)
    {
        $this->apiKey = $settings->get('apiKey');
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $apiKey = $request->getHeaderLine('Api-Key');
        if ($this->apiKey !== '' && hash_equals($this->apiKey, $apiKey)) {
            return $handler->handle($request);
        }

        throw new HttpForbiddenException($request, 'Invalid API Key');
    }
}
