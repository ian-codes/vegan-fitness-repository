<ul class="appear">
    {#each workouts as workout}
        <li>
            <a href="workouts/{workout.id}" class="card w-full">
                <h2>
                    {workout.title}
                </h2>
                <div class="text-white flex flex-row items-baseline justify-between">
                    <span>{workout.exercises.length} 
                        Exercise{(workout.exercises.length > 1 ? "s" : "")}
                    </span>
                    <span>
                        {workout.difficulty || ""}
                    </span>
                    <span class="text-sm opacity-70">
                        by <i>{workout.created_by || "Anonymous Vegan"}</i>
                    </span>
                </div>
            </a>
        </li>
    {/each}
</ul>

<script>
    export let workouts = [];
</script>