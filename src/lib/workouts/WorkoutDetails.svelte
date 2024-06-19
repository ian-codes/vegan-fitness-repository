
<div class="appear flex flex-col justify-center items-center gap-10">
    <section class="flex text-white flex-col gap-4 max-w-md w-full">
        <h1>{workout.title}</h1>
        <p class="text-center text-sm opacity-70 block w-full">
            Courtesy of: <i>{workout.created_by || "Anonymous Vegan"} </i>
        </p>
    
        {#if workout.notes}
            <div class="p-2 w-full flex flex-col gap-2">
                <span class="font-light opacity-80">Notes:</span>
                <p>{workout.notes}</p>
            </div>
        {/if}
    </section>
    <section class="text-white flex flex-col max-w-md w-full">
        <ol class="text-white flex flex-col">
            <li class="p-2 pointer-events-none font-extralight text-xs opacity-60 flex 
                flex-row justify-between mb-2">
                <p>
                    Exercise
                </p>
                <p>
                    Sets x Reps
                </p>
            </li>
            {#each workout.exercises as exercise, i}
                <li class="px-4 py-6 exercise flex flex-row gap-12 justify-between">
                    <p class="max-w-md">
                        {exercise.name}
                    </p>
                    <p class="min-w-max">
                        {exercise.sets} x {exercise.reps}
                    </p>
                </li>
            {/each}
        </ol>
    </section>
</div>


<script>
    export let workout;
</script>


<style lang="postcss">
    .exercise:nth-child(even) {
        @apply bg-slate-800;
    }
    li {
        @apply rounded-xl;
    }
</style>