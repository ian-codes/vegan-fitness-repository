<script>
    export let visible = true;
    export let message;
</script>

<p class="{visible ? "error-msg" : "hidden"}">
    {message}
</p>
