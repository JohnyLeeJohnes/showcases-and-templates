<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="m-0">Unsent emails</h1>
    <button id="sendNow" class="btn btn-outline-primary">Send now</button>
</div>
<p class="text-muted">Emails saved in your browser (localStorage). They are resent automatically every minute.</p>

<div id="emailList" class="list-group"></div>

<script>
    const renderQueue = () => {
        const list = document.querySelector("#emailList");
        list.replaceChildren();
        const queue = getQueue();
        if (queue.length === 0) {
            list.textContent = "No unsent emails.";
            return;
        }
        for (const email of queue) {
            const item = document.createElement("div");
            item.className = "list-group-item";
            // textContent, not innerHTML - the email text must not be run as HTML
            for (const [label, value] of [["To", email.to], ["CC", email.cc], ["Subject", email.subject], ["Body", email.body]]) {
                const row = document.createElement("div");
                row.textContent = `${label}: ${value || "-"}`;
                item.append(row);
            }
            list.append(item);
        }
    };

    document.querySelector("#sendNow").addEventListener("click", async () => {
        await sendQueuedEmails();
        renderQueue();
    });
    renderQueue();
</script>
