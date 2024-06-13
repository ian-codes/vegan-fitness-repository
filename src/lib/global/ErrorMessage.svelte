<script>
    export let visible = true;
</script>

<p class="{visible ? "error-msg" : "hidden"}">
    <slot />
</p>
