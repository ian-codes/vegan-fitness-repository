<script>
    import { goto } from "$app/navigation";

    export let data;

    const workout = data.workout[0];

    function goBack() {
        goto('/workouts');
    }
</script>

<section class="section">
    <div class="flex flex-col gap-10 items-start">
        <button class="btn" on:click={goBack}>Back</button>
        <h1>{workout.title}</h1>
    </div>
    <div class="text-white flex flex-col max-w-md w-full gap-5">
        <ol class="text-white flex flex-col gap-3">
            {#each workout.exercises as exercise, i}
                <li class="flex flex-row justify-between">
                    <p>
                        {exercise.name}
                    </p>
                    <p>
                        {exercise.sets} x {exercise.reps}
                    </p>
                </li>
            {/each}
        </ol>
    </div>
</section>
