<script>
    import ErrorMessage from "$lib/global/ErrorMessage.svelte";

    export let name;
    export let label;
    export let value;
    export let placeholder;
    export let optional = false;
    export let isError = false;
    export let errorMessage = "This input is required.";

    let inputRef;

    function focusInput() {
        inputRef.focus();
        value = "";
    }
</script>


<div class="flex flex-col gap-1">
    <label for="{name}">
        {label}
        {#if optional}
            <span class="font-light opacity-70">(Optional)</span>
        {:else}
            *
        {/if}
    </label>
    <div class="input flex flex-row items-center gap-2">
        <input
            class:invalid={isError}
            bind:this={inputRef}
            name="{name}"
            placeholder="{placeholder}"
            bind:value={value} 
        />
        
        <button on:click={focusInput}
            type="button"
            class="w-4 h-4 hover:invert-0 hover:bg-slate-200 rounded-full 
            p-2 invert bg-no-repeat bg-contain" 
            style="background-image: url('/edit.svg');"
        />
    </div>
</div>

{#if !optional}
    <ErrorMessage 
        bind:visible={isError} 
        message={errorMessage}
    />
{/if}


<style lang="postcss">
    .invalid {
        @apply outline-1 outline-red-500 outline;
    }
</style>