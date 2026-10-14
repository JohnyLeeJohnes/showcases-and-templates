<?php
session_start();

// Path without query string and trailing slash, e.g. "/about?x=1" -> "/about"
$path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/') ?: '/';

// Actions only do some work and redirect, so they run before any HTML is sent
$actions = [
    '/login/logme' => '/views/login/logme.php',
    '/logout'      => '/views/login/logout.php',
];

// Pages are rendered between the shared header and footer
$pages = [
    '/'        => '/views/index.php',
    '/authors' => '/views/authors.php',
    '/courses' => '/views/courses.php',
    '/about'   => '/views/aboutus.php',
    '/login'   => '/views/login.php',
];

if (isset($actions[$path])) {
    require __DIR__ . $actions[$path];
    exit();
}

if (isset($pages[$path])) {
    $page = $pages[$path];
} else {
    http_response_code(404);
    $page = '/views/404.php';
}

require __DIR__ . '/views/core/header.php';
require __DIR__ . $page;
require __DIR__ . '/views/core/footer.php';
