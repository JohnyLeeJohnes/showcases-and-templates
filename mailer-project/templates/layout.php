<?php
/**
 * Shared page layout
 * @var string $content rendered page template
 * @var string $title
 * @var string $path current URL path
 */
$links = [
    '/'              => 'Home',
    '/send-email'    => 'Send email',
    '/local-storage' => 'Unsent emails',
    '/api-key'       => 'API key',
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <title><?= htmlspecialchars($title) ?></title>
    <!-- Shared helpers (used by the pages) + resends unsent emails every minute -->
    <script src="/js/script.js"></script>
</head>
<body>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <a class="navbar-brand" href="/">Mailer</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav ms-auto">
                <?php foreach ($links as $href => $label): ?>
                    <a class="nav-link <?= $path === $href ? 'active' : '' ?>" href="<?= $href ?>"><?= $label ?></a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</nav>

<main class="container py-5" style="max-width: 720px">
    <div id="flash"></div>
    <?= $content ?>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script></body>
</html>
