<h1 class="mb-4">Create new email</h1>

<form id="emailForm">
    <div class="mb-3">
        <label for="to" class="form-label">Recipient</label>
        <input type="email" class="form-control" id="to" name="to" maxlength="255" required>
    </div>
    <div class="mb-3">
        <label for="cc" class="form-label">CC <span class="text-muted">(optional, separate more addresses with a comma)</span></label>
        <input type="email" class="form-control" id="cc" name="cc" multiple>
    </div>
    <div class="mb-3">
        <label for="subject" class="form-label">Subject</label>
        <input type="text" class="form-control" id="subject" name="subject" maxlength="1000" required>
    </div>
    <div class="mb-3">
        <label for="body" class="form-label">Body</label>
        <textarea class="form-control" id="body" rows="6" name="body" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Send email</button>
</form>

<script>
    const form = document.querySelector("#emailForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const button = form.querySelector("button");
        button.disabled = true;
        const email = Object.fromEntries(new FormData(form));
        const response = await sendEmail(email);
        button.disabled = false;

        if (response?.ok) {
            flash("Email was sent.");
            form.reset();
        } else if (response?.status === 403) {
            flash("Invalid API key. Set it on the API key page.", "danger");
        } else if (response?.status === 400) {
            const payload = await response.json();
            flash(payload.error?.description ?? "Invalid email.", "danger");
        } else {
            // Network or server problem - save it and try again later
            addToQueue(email);
            flash("Email could not be sent now. It was saved and will be sent automatically later.", "warning");
            form.reset();
        }
    });
</script>
