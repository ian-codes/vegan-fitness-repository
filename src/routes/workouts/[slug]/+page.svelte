<script>
    import WorkoutDetails from "$lib/workouts/WorkoutDetails.svelte";
    export let data;
</script>


<section class="section">
    {#await data.workout}
        <p>Loading workout...</p>
    {:then workout}
        <WorkoutDetails workout={workout} />
    {:catch error}
        <p>Couldn't load workout. {error.message}</p>
    {/await}
</section>
