<script>
    export let recipes = [];
</script>


<ul class="appear">
    {#each recipes as recipe}
        <li>
            <a href="workouts/{recipe.id}" class="card w-full">
                <h2>
                    {recipe.title}
                </h2>
                <p>{recipe.exercises.length} Exercises</p>
            </a>
        </li>
    {/each}
</ul>