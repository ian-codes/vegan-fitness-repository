<script>
    import ExerciseEditModal from "./ExerciseEditModal.svelte";

    export let exercises = [];

    let isEditable = false;
    let isModalOpen = false;
    let selectedExercise;

    function handleClick(exercise) {
        selectedExercise = exercise;
        isModalOpen = true;
    };

    function newExercise() {
        isModalOpen = true;
        selectedExercise = {
            name: "",
            sets: 0,
            reps: 0
        };
    }
</script>


<ExerciseEditModal bind:isVisible={isModalOpen} bind:exercise={selectedExercise} bind:exercises={exercises} />

<section class="flex flex-col gap-5">
    <div class="flex flex-row items-center justify-between">
        <h2 class="mb-4 text-xl text-center">Exercises ({exercises.length})</h2>

        <button class="btn-plain" on:click={newExercise}>
            Add Exercise
        </button>
    </div>

    <ol class="flex flex-col gap-1">
        {#if exercises.length != 0}
            <div class="font-bold flex flex-row items-center justify-between">
                <span>Name</span>
                <div class="flex flex-row gap-5">
                    <span>Sets</span>
                    <span>Reps</span>
                </div>
            </div>
        {/if}

        {#each exercises as exercise}
            <button class="hover:bg-slate-600 transition-all" on:click={() => handleClick(exercise)}>
                <li class="flex flex-row items-center justify-between border-b border-slate-800">
                    <span class="py-2">{exercise.name}</span>
                    <div class="flex flex-row gap-8">
                        <span class="text-end">{exercise.sets}</span>
                        <span class="text-end">{exercise.reps}</span>
                    </div>
                </li>
            </button>
        {/each}
    </ol>
</section>
