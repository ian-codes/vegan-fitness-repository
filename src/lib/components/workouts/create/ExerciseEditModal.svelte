<script>
    import ErrorMessage from "$lib/components/ErrorMessage.svelte";
    import Button from "$lib/components/Button.svelte";
    export let isVisible = false;

    let defaultExercise = {
        name: "",
        reps: 0,
        sets: 0
    }

    let attemptedSave = false;

    export let exercise = defaultExercise;
    export let exercises = [];

    let isEditingExistingExercise = exercise == defaultExercise;

    $: noName = attemptedSave && exercise.name === "";
    $: noReps = attemptedSave && exercise.reps < 1;
    $: noSets = attemptedSave && exercise.sets < 1;

    function cancel() {
        exercise = defaultExercise;
        isVisible = false;
        attemptedSave = false;
    }

    function save() {
        attemptedSave = true;

        if (exercise.name === "") return;
        if (exercise.sets === 0) return;
        if (exercise.reps === 0) return;

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

        isVisible = false;
        attemptedSave = false;
    }

    function deleteExercise() {
        exercises = exercises.filter(e => e.name != exercise.name);
        exercise = defaultExercise;
        isVisible = false;
        attemptedSave = false;
    }
</script>


{#if isVisible}
    <div class="z-50 text-center flex gap-5 flex-col items-center justify-center absolute inset-0 
    
    bg-slate-800 bg-opacity-80 backdrop-blur-md">
        <div class:error={noName} class="flex flex-col gap-1">
            <label class="text-center" for="name">Name</label>
            <input bind:value={exercise.name} 
                class="text-center"
                placeholder="Exercise name"
                name="name" type="text" required />
        </div>

        <ErrorMessage visible={noName}>
            Please give the exercise a name.
        </ErrorMessage>

        <div class:error={noSets} class="flex flex-col gap-1">
            <label  for="sets">Sets</label>
            <input bind:value={exercise.sets} 
                class="text-center"
                name="sets" type="number" required />
        </div>

        <ErrorMessage visible={noSets}>
            Please add at least 1 set.
        </ErrorMessage>

        <div class:error={noReps} class="flex flex-col gap-1">
            <label class="text-center" for="reps">Reps</label>
            <input bind:value={exercise.reps} 
                class="text-center"
                name="reps" type="number" required />
        </div>

        <ErrorMessage visible={noName}>
            Please add at least 1 rep.
        </ErrorMessage>

        <div>
            <Button onClick={cancel} title="Cancel" />
            <Button onClick={save} title="Save" />
        </div>

        {#if isEditingExistingExercise}
            <Button onClick={deleteExercise} title="Delete Exercise" />
        {/if}
    </div>
{/if}

