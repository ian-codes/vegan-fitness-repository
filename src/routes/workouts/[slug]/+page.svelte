<script>
    import WorkoutDetails from "$lib/workouts/WorkoutDetails.svelte";
    export let data;
</script>


{#await data.workout}
    <p>Loading workout...</p>
{:then workout}
    <WorkoutDetails workout={workout[0]} />
{:catch error}
    <p>Couldn't load workout. {error.message}</p>
{/await}
