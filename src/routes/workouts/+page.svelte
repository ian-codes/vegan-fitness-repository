<script>
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";

    export const config = {
        runtime: 'nodejs18.x'
    };
    
    export let data;

    function handleCreate() {
        goto('/workouts/create');
    }
</script>

<section class="section">
    <div class="flex flex-row gap-5 justify-center items-center">
        <h1>Workouts</h1>
        <button on:click={handleCreate} class="btn">
            Create New
        </button>
    </div>

    <ul>
        {#each data.workouts as workout}
            <li>
                <a href="workouts/{workout.id}" class="card w-full">
                    <h2>
                        {workout.title}
                    </h2>
                    <p>{workout.exercises.length} Exercises</p>
                </a>
            </li>
        {/each}
    </ul>
</section>