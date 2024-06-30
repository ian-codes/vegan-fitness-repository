<script lang="ts">
    export let title: string;
    export let onClick = () => {};
</script>


<button on:click={onClick}
    class="text-white bg-slate-700 shadow-md transition-all rounded-md px-4 py-2">
    {title}
</button>

<style lang="postcss">
    @media (hover: hover) {
        button {
            @apply hover:bg-slate-600 hover:shadow-slate-800 hover:scale-105;
        }
    }
</style>