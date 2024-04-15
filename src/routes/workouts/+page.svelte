<script lang="ts">
    import type { PageData } from "../$types";

    export let data: PageData;

    $: ({ workouts } = data);
</script>

<section>
    <h1>Workout List</h1>
    <p>This is a list of workouts.</p>
    <ul>
        {#each workouts as workout}
            <li>
                {workout.title}
            </li>
        {/each}
    </ul>
</section>