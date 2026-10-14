<?php

require_once __DIR__ . '/DBC.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_POST['name']) || empty($_POST['password'])) {
    $_SESSION['error'] = 'Fill in your name and password';
    header('Location: /login');
    exit();
}

if (verifyUser($_POST['name'], $_POST['password'])) {
    header('Location: /');
} else {
    $_SESSION['error'] = 'Invalid login';
    header('Location: /login');
}
exit();


function verifyUser(string $username, string $password): bool
{
    $statement = DBC::getConnection()->prepare('SELECT id, username, password FROM users WHERE username = ?');
    $statement->bind_param('s', $username);
    $statement->execute();
    $user = $statement->get_result()->fetch_assoc();

    if (!$user || !password_verify($password, $user['password'])) {
        return false;
    }

    // New session id after login prevents session fixation
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['username'];
    return true;
}
