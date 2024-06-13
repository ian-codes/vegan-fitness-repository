<ul class="appear">
    {#each workouts as workout}
        <li>
            <a href="workouts/{workout.id}" class="card w-full">
                <h2>
                    {workout.title}
                </h2>
                <p>{workout.exercises.length} 
                    Exercise{(workout.exercises.length > 1 ? "s" : "")}
                </p>
            </a>
        </li>
    {/each}
</ul>

<script>
    export let workouts = [];
</script>