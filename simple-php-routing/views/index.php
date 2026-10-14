<h1>Platform</h1>
<?php if (isset($_SESSION['user_name'])): ?>
    <div class="alert alert-success">Logged in as <?= htmlspecialchars($_SESSION['user_name']) ?></div>
<?php endif; ?>
<p>Welcome to the platform.</p>
