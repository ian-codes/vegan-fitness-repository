<script>
    import RecipeDetails from "$lib/recipes/RecipeDetails.svelte";
    export let data;
</script>


<section class="section">
    {#await data.recipe}
        <p>Loading recipe...</p>
    {:then recipe}
        <RecipeDetails recipe={recipe} />
    {:catch error}
        <p>Couldn't load recipe. {error.message}</p>
    {/await}
</section>
