<?php

declare(strict_types=1);

use App\Application\Actions\Email\SendEmailAction;
use App\Application\Middleware\APIMiddleware;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Views\PhpRenderer;

return function (App $app) {
    //OPTIONS Pre-Flight (CORS) for the API
    $app->options('/api/{routes:.*}', function (Request $request, Response $response) {
        return $response;
    });

    //HTML Render - every page is wrapped in templates/layout.php
    $renderer = new PhpRenderer(__DIR__ . '/../templates', [], 'layout.php');
    $pages = [
        '/'              => ['index.php', 'Mailer'],
        '/send-email'    => ['send-email.php', 'Send email'],
        '/local-storage' => ['local-storage.php', 'Unsent emails'],
        '/api-key'       => ['api-key.php', 'API key'],
    ];
    foreach ($pages as $path => [$template, $title]) {
        $app->get($path, function (Request $request, Response $response) use ($renderer, $path, $template, $title) {
            return $renderer->render($response, $template, ['path' => $path, 'title' => $title]);
        });
    }

    //REST API
    $app->post('/api/sendEmail', SendEmailAction::class)
        ->add(APIMiddleware::class);
};
