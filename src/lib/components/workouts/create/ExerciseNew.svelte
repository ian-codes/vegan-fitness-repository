<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { Exercise } from "$lib/models/workout.ts";
    import ExerciseList from "./ExerciseList.svelte";

    export let onAdd = (exercise: Exercise) => {};
    export let exercises: Exercise[];

    let exercise: Exercise = {
        name: "",
        sets: 0,
        reps: 0
    }

    let isCollapsed: boolean = false;

    function handleAdd() {
        onAdd(exercise);

        exercise = {name: "", sets: 0, reps: 0};
    }
</script>


<fieldset class="rounded-lg overflow-hidden flex flex-col gap-2 bg-gradient-to-br from-blue-800 to-slate-900">  
    <button on:click={() => isCollapsed = !isCollapsed}
        class="p-4 flex transition-all flex-row shadow-slate-300 shadow-sm items-center justify-between hover:bg-slate-600">
        
        <span class="text-2xl">Exercises ({exercises.length})</span>
        <span class="w-5 h-5 invert" style="background-image: url(/collapse.svg);" />
    </button>


    {#if !isCollapsed}
        <ExerciseList exercises={exercises} />
    {/if}

</fieldset>

