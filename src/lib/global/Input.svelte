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


<div class:error={isError}>
    <div class="flex flex-col gap-1">
        <label for="{name}">
            {label} {optional ? "(Optional)" : "*"}
        </label>
        <div class="input flex flex-row items-center gap-2">
            <input
                bind:this={inputRef}
                name="{name}"
                placeholder="{placeholder}"
                bind:value={value} 
            />
            
            <button on:click={focusInput}
                type="button"
                class="w-4 h-4 invert bg-no-repeat bg-contain" 
                style="background-image: url('/edit.svg');"
            />
        </div>
    </div>
</div>

{#if !optional}
    <ErrorMessage 
        bind:visible={isError} 
        message={errorMessage}
    />
{/if}


<style lang="postcss">

</style>