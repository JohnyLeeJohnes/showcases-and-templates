<?php

declare(strict_types=1);

namespace App\Application\Actions\Email;

use App\Application\Actions\Action;
use App\Application\Actions\ActionError;
use App\Application\Actions\ActionPayload;
use App\Application\Support\Mailer;
use PHPMailer\PHPMailer\Exception as MailerException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

/**
 * POST /api/sendEmail
 * JSON body: {"to": "a@b.cz", "cc": "c@d.cz, e@f.cz" or ["c@d.cz"], "subject": "...", "body": "..."}
 */
class SendEmailAction extends Action
{
    public function __construct(LoggerInterface $logger, private readonly Mailer $mailer)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $formData = (array) ($this->getFormData() ?? []);
        $to = trim((string) ($formData['to'] ?? ''));
        $subject = trim((string) ($formData['subject'] ?? ''));
        $body = (string) ($formData['body'] ?? '');
        $cc = $formData['cc'] ?? [];
        $cc = is_array($cc) ? $cc : explode(',', (string) $cc);
        $cc = array_values(array_filter(array_map(fn ($address) => trim((string) $address), $cc)));

        //Validate data from Form
        $error = $this->validate($to, $cc, $subject, $body);
        if ($error !== null) {
            return $this->respond(new ActionPayload(400, null, new ActionError(ActionError::VALIDATION_ERROR, $error)));
        }

        try {
            $this->mailer->send($to, $cc, $subject, $body);
        } catch (MailerException $e) {
            $this->logger->error('Sending email failed: ' . $e->getMessage());
            return $this->respond(new ActionPayload(503, null, new ActionError(ActionError::SERVER_ERROR, 'Email could not be sent')));
        }

        return $this->respondWithData(['message' => 'OK']);
    }

    /**
     * @param string[] $cc
     * @return string|null error message, null when everything is valid
     */
    private function validate(string $to, array $cc, string $subject, string $body): ?string
    {
        if ($to === '') {
            return 'Recipient (to) is required';
        }
        foreach ([$to, ...$cc] as $address) {
            if (strlen($address) > 255 || !filter_var($address, FILTER_VALIDATE_EMAIL)) {
                return "Invalid email address: {$address}";
            }
        }
        if ($subject === '' || mb_strlen($subject) > 1000) {
            return 'Subject is required (max 1000 characters)';
        }
        if (trim($body) === '') {
            return 'Body is required';
        }
        return null;
    }
}
