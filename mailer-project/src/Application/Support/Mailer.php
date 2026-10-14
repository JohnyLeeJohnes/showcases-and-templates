<?php

declare(strict_types=1);

namespace App\Application\Support;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class Mailer
{
    /**
     * @param array{host: string, port: int, encryption: string, username: string, password: string, fromAddress: string, fromName: string} $settings
     */
    public function __construct(private readonly array $settings)
    {
    }

    /**
     * @param string[] $cc
     * @throws Exception when the email can't be sent
     */
    public function send(string $to, array $cc, string $subject, string $body): void
    {
        $mailer = new PHPMailer(true);
        $mailer->CharSet = PHPMailer::CHARSET_UTF8;
        $mailer->isSMTP();
        $mailer->Host = $this->settings['host'];
        $mailer->Port = $this->settings['port'];
        $mailer->SMTPSecure = $this->settings['encryption'];
        $mailer->SMTPAuth = $this->settings['username'] !== '';
        $mailer->Username = $this->settings['username'];
        $mailer->Password = $this->settings['password'];

        $mailer->setFrom($this->settings['fromAddress'], $this->settings['fromName']);
        $mailer->addAddress($to);
        foreach ($cc as $address) {
            $mailer->addCC($address);
        }
        // Plain text, so the user can't inject HTML into the email
        $mailer->isHTML(false);
        $mailer->Subject = $subject;
        $mailer->Body = $body;

        $mailer->send();
    }
}
