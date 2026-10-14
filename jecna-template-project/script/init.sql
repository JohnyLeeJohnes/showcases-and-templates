CREATE DATABASE IF NOT EXISTS TestDatabase;
USE TestDatabase;

CREATE TABLE IF NOT EXISTS user(
    id varchar(255) primary key,
    username varchar(255) not null unique,
    email varchar(255) not null,
    password varchar(255) not null
);
