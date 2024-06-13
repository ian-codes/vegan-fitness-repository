<script>
    export let recipe;
</script>


<div class="flex flex-col gap-10 items-start">
    <h1>{recipe[0].title}</h1>
</div>
<div class="text-white flex flex-col max-w-md w-full gap-5">
    <ol class="text-white flex flex-col gap-3">
        {#each recipe[0].ingredients as ingredient, i}
            <li class="flex flex-row justify-between">
                <p>
                    {ingredient.name}
                </p>
                <p>
                    {ingredient.amount} {ingredient.unit}
                </p>
            </li>
        {/each}
    </ol>
</div>