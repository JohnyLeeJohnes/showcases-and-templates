const QUEUE_STORAGE   = 'UNSENT_EMAIL';
const API_KEY_STORAGE = 'API_KEY';
const RETRY_INTERVAL  = 60 * 1000;

const getApiKey = () => localStorage.getItem(API_KEY_STORAGE) ?? '';
const getQueue  = () => JSON.parse(localStorage.getItem(QUEUE_STORAGE)) ?? [];
const setQueue  = (queue) => localStorage.setItem(QUEUE_STORAGE, JSON.stringify(queue));

// Saves an email that could not be sent, so it can be sent later
const addToQueue = (email) => setQueue([...getQueue(), {...email, id: crypto.randomUUID()}]);

// Shows a Bootstrap alert at the top of the page
const flash = (message, type = 'success') => {
    const alert     = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role      = 'alert';
    alert.textContent = message;

    const close             = document.createElement('button');
    close.type              = 'button';
    close.className         = 'btn-close';
    close.dataset.bsDismiss = 'alert';
    alert.append(close);

    document.querySelector('#flash').append(alert);
};

// Sends one email to the API. Returns the Response, or null if the server can't be reached
const sendEmail = async ({id, ...email}) => {
    try {
        return await fetch('/api/sendEmail', {
            method:  'POST',
            headers: {'Content-Type': 'application/json', 'Api-Key': getApiKey()},
            body:    JSON.stringify(email),
        });
    } catch {
        return null;
    }
};

// Tries to send every saved email, removes the ones that were sent
let isSending = false;
const sendQueuedEmails = async () => {
    if (isSending) {
        return;
    }
    isSending = true;
    for (const email of getQueue()) {
        const response = await sendEmail(email);
        if (response?.ok) {
            // Re-read the queue - a new email could have been added meanwhile
            setQueue(getQueue().filter(queued => queued.id !== email.id));
            console.log('Unsent email was sent:', email.subject);
        }
    }
    isSending = false;
};

sendQueuedEmails();
setInterval(sendQueuedEmails, RETRY_INTERVAL);
