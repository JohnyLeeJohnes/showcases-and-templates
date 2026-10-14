<h1 class="mb-4">API key</h1>

<form id="apiKeyForm">
    <div class="mb-3">
        <label for="apiKeyInput" class="form-label">Enter the API key (the API_KEY value from .env)</label>
        <input type="text" class="form-control" id="apiKeyInput" required>
    </div>
    <button class="btn btn-primary" type="submit">Save</button>
</form>

<script>
    const input = document.querySelector("#apiKeyInput");
    input.value = getApiKey();
    document.querySelector("#apiKeyForm").addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem(API_KEY_STORAGE, input.value.trim());
        flash("API key saved.");
    });
</script>
