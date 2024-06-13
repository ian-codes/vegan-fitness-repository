<script>
    import { goto } from "$app/navigation";
    import RecipeList from "$lib/recipes/RecipeList.svelte";

    export const config = {
        runtime: 'nodejs18.x'
    };

    export let data;
    
    function handleCreate() {
        goto('/recipes/create');
    }
</script>


<section class="section">
    <div class="flex flex-row gap-5 justify-center items-center">
        <h1>Recipes</h1>
        <button on:click={handleCreate} class="btn">
            Create New
        </button>
    </div>

    {#await data.recipes}
        <p>Loading recipes...</p>
    {:then recipes}
        <RecipeList recipes={recipes} />
    {:catch error}
        <p>Couldn't load recipes. {error.message}</p>
    {/await}
</section>

