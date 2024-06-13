<script>
    import { goto } from "$app/navigation";
    import WorkoutList from "$lib/workouts/WorkoutList.svelte";

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

    {#await data.workouts}
        <p>Loading workouts...</p>
    {:then workouts}
        <WorkoutList workouts={workouts} />
    {:catch error}
        <p>Couldn't load workouts. {error.message}</p>
    {/await}
</section>

