<script>
    import ErrorMessage from "$lib/global/ErrorMessage.svelte";

    export let name;
    export let label;
    export let value;
    export let placeholder;
    export let optional = false;
    export let isError = false;
    export let errorMessage = "This input is required.";

    let textAreaRef;

    function focusInput() {
        textAreaRef.focus();
        value = "";
    }
</script>


<div class="w-full">
    <div class:error={isError} class="gap-2">
        <div class="flex flex-col gap-1">
            <label for="{name}">
                {label}
                {#if optional}
                    <span class="font-light opacity-70">(Optional)</span>
                {:else}
                    *
                {/if}
            </label>
            <div class="flex flex-row items-center gap-2">
                <textarea
                    bind:this={textAreaRef}
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
</div>


<style lang="postcss">
    textarea {
        @apply w-full bg-transparent min-h-12  text-white resize-y max-h-32 
        outline outline-1 outline-slate-400 p-2 rounded-md
    }
</style>
