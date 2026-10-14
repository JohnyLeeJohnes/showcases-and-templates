<?php

class DBC
{
    const SERVER_IP = "localhost";
    const PORT = 3306;
    const USER = "root";
    const PASSWORD = "";
    const DATABASE = "LoginTest";

    private static ?mysqli $connection = null;

    public static function getConnection(): mysqli
    {
        if (!self::$connection) {
            // Throw exceptions on errors instead of returning false
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            self::$connection = new mysqli(self::SERVER_IP, self::USER, self::PASSWORD, self::DATABASE, self::PORT);
            self::$connection->set_charset('utf8mb4');
        }
        return self::$connection;
    }

    public static function closeConnection(): void
    {
        if (self::$connection) {
            self::$connection->close();
            self::$connection = null;
        }
    }
}
