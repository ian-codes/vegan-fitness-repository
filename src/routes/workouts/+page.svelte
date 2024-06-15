<script>
    import { goto } from "$app/navigation";
    import { difficulties } from "$lib/difficulties.js";
    import WorkoutList from "$lib/workouts/WorkoutList.svelte";

    export const config = {
        runtime: 'nodejs18.x'
    };

    export let data;

    const filterDifficulties = ["All", ...difficulties]
    let selectedDifficulty = "All";
    let filteredWorkouts;

    $: filteredWorkouts = selectedDifficulty === 'All'
        ? data.workouts
        : data.workouts.filter(w => w.difficulty === selectedDifficulty);

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

    <!-- <div class="flex items-center gap-2">
        <span class="text-white">
            Level
        </span>
        <select bind:value={selectedDifficulty}>
            {#each filterDifficulties as difficulty}
                <option value="{difficulty}">{difficulty}</option>
            {/each}
        </select>
    </div> -->

    {#await data.workouts}
        <p>Loading workouts...</p>
    {:then workouts}
        <WorkoutList workouts={workouts} />
    {:catch error}
        <p>Couldn't load workouts. {error.message}</p>
    {/await}
</section>

