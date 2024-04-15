
<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { Exercise } from "$lib/models/workout";

    export let isVisible: boolean = false;

    let defaultExercise: Exercise = {
        name: "",
        reps: 0,
        sets: 0
    }

    export let exercise: Exercise = defaultExercise;

    export let exercises: Exercise[] = [];

    let isEditingExistingExercise = exercise == defaultExercise;

    function cancel() {
        isVisible = false;
        exercise = defaultExercise;
    }

    function save() {
        isVisible = false;
        if (!exercises.includes(exercise)) {
            exercises.push(exercise);
        }
        else {
            const pos = exercises.map(e => e.name).indexOf(exercise.name);
            if (exercises[pos] != exercise) {
                exercises[pos] = exercise;
            }
        }
        exercises = exercises;
        exercise = defaultExercise;
    }

    function deleteExercise() {
        isVisible = false;
        exercises = exercises.filter(e => e.name != exercise.name);
        exercise = defaultExercise;
    }
</script>


{#if isVisible}
    <div class="z-50 text-center flex gap-5 flex-col items-center justify-center absolute inset-0 
    
    bg-slate-800 bg-opacity-80 backdrop-blur-md">
        <div class="flex flex-col gap-1">
            <label class="text-center" for="name">Name</label>
            <input bind:value={exercise.name} 
                class="text-center"
                placeholder="Exercise name"
                name="name" type="text" required />
        </div>

        <div class="flex flex-col gap-1">
            <label  for="sets">Sets</label>
            <input bind:value={exercise.sets} 
                class="text-center"
                name="sets" type="number" required />
        </div>

        <div class="flex flex-col gap-1">
            <label class="text-center" for="reps">Reps</label>
            <input bind:value={exercise.reps} 
                class="text-center"
                name="reps" type="number" required />
        </div>

        <div>
            <Button onClick={cancel} title="Cancel" />
            <Button onClick={save} title="Save" />
        </div>

        {#if isEditingExistingExercise}
            <Button onClick={deleteExercise} title="Delete Exercise" />
        {/if}
    </div>
{/if}

