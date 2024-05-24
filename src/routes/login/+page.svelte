<script>    
    async function handleSignIn() {
        const response = await fetch('/login?provider=discord');
        if (response.ok) {
            const { success, discordUrl } = await response.json();
            if (success) {
                window.location.href = discordUrl;
            } else {
                console.error("Failed to fetch Discord login URL");
            }
        } else {
            console.error("Failed to communicate with the server");
        }
        console.log(response);
    }
</script>

<button class="btn" on:click={handleSignIn}>Sign in with Discord</button>
