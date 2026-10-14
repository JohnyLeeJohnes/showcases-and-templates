CREATE DATABASE IF NOT EXISTS LoginTest;
USE LoginTest;

CREATE TABLE IF NOT EXISTS users (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- password_hash() output
);

-- Demo user: karel / ahoj123
INSERT IGNORE INTO users (username, password)
VALUES ('karel', '$2y$10$nNyhj8cPzIxayhGU3bjdceq0H63/A4ZDqjIUJosrS77wHk1AV.Anq');
