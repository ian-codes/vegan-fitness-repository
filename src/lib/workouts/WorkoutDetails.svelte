<div class="flex flex-col gap-10 items-start">
    <h1>{workout[0].title}</h1>
</div>
<div class="text-white flex flex-col max-w-md w-full gap-5">
    <ol class="text-white flex flex-col gap-3">
        {#each workout[0].exercises as exercise, i}
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


<script>
    export let workout;
</script>