<div class="flex text-white flex-col gap-4 items-start">
    <h1>{workout[0].title}</h1>
    <p class="text-center text-sm opacity-70 block w-full">
        Made by <i>{workout.created_by || "Anonymous Vegan"} </i>
    </p>
</div>
<div class="text-white flex flex-col max-w-md w-full gap-5">
    <ol class="text-white flex flex-col gap-3">
        <li class="pointer-events-none font-extralight text-xs opacity-60 flex 
            flex-row justify-between mb-2">
            <p>
                Exercise
            </p>
            <p>
                Sets x Reps
            </p>
        </li>
        {#each workout[0].exercises as exercise, i}
            <li class="flex flex-row gap-12 justify-between">
                <p class="max-w-md">
                    {exercise.name}
                </p>
                <p class="min-w-max">
                    {exercise.sets} x {exercise.reps}
                </p>
            </li>
        {/each}
    </ol>
</div>


<script>
    export let workout;
</script>