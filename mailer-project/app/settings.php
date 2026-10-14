<?php

declare(strict_types=1);

use App\Application\Settings\Settings;
use App\Application\Settings\SettingsInterface;
use DI\ContainerBuilder;
use Monolog\Level;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        SettingsInterface::class => function () {
            return new Settings([
                'displayErrorDetails' => ($_ENV['APP_DEBUG'] ?? '0') === '1',
                'logError'            => false,
                'logErrorDetails'     => false,
                'logger'              => [
                    'name'  => 'slim-app',
                    'path'  => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
                    'level' => Level::Debug,
                ],
                'apiKey'              => $_ENV['API_KEY'] ?? '',
                'mail'                => [
                    'host'        => $_ENV['MAIL_HOST'] ?? '',
                    'port'        => (int) ($_ENV['MAIL_PORT'] ?? 587),
                    'encryption'  => $_ENV['MAIL_ENCRYPTION'] ?? '',
                    'username'    => $_ENV['MAIL_USERNAME'] ?? '',
                    'password'    => $_ENV['MAIL_PASSWORD'] ?? '',
                    'fromAddress' => $_ENV['MAIL_FROM_ADDRESS'] ?? '',
                    'fromName'    => $_ENV['MAIL_FROM_NAME'] ?? '',
                ],
            ]);
        }
    ]);
};
