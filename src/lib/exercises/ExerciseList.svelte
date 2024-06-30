<script>
    import { goto } from "$app/navigation";
    import ExerciseListItem from "./ExerciseListItem.svelte";

    export let exercises = [];

    export function validate() {
        let exerciseValidationResults = exerciseRefs.map(exRef => {
            return exRef.validate();
        });
        let areExercisesValid = !exerciseValidationResults.includes(false);
        return areExercisesValid;
    }

    let exerciseRefs = [];
    let listOpen = true;

    function handleListClick() {
        // if no exercises, keep the list expanded 
        // so that when a user adds an exercise, the list is initially visible
        listOpen = exercises.length == 0 ? true : !listOpen;
    }

    function handleAddExercise() {
        if (!validate())
            return;

        if (exercises.length == 20) {
            return;
        }
        let newExercise = {
            id: exercises.length,
            name: "",
            sets: "",
            reps: ""
        }
        exercises = [...exercises, newExercise]
    }
</script>


<div id="exercises" class="flex flex-col gap-5 mb-6">
    <div class="flex flex-row items-center justify-between">
        <h2 class="flex items-center gap-2 text-xl !mb-0 w-full relative">
            <button on:click={handleListClick} 
                type="button" 
                class="infos-button absolute inset-0">
            </button>

            <span 
                style="background-image: url('/expand.svg')"
                class="{listOpen ? "rotate-180" : ""} w-4 h-4 block bg-no-repeat
                invert bg-contain bg-center pointer-events-none" 
            />
            Exercises 
            <span class="font-light opacity-70">({exercises.length})</span>
        </h2>

        <button 
            type="button" 
            class="btn-plain min-w-fit" 
            on:click={handleAddExercise}>

            Add
        </button>
    </div>

    {#if exercises.length > 0 && listOpen}
        <ol class="flex flex-col gap-2">
            <div class="font-bold flex flex-row items-center justify-between">
                <span>Name of exercise</span>
                <div class="flex flex-row gap-5">
                    <span>Sets</span>
                    <span>Reps</span>
                </div>
            </div>

            {#each exercises as exercise, index (exercise.id)}
                <ExerciseListItem 
                    bind:this={exerciseRefs[index]}
                    exercise={exercise} 
                />
            {/each}
        </ol>
    {/if}
</div>


<style lang="postcss">
    @media (hover: hover) {
        .infos-button:hover + span {
            @apply outline-1 outline outline-black;
        }
    }
    .infos-button + span {
        @apply outline-none rounded-full;
        transition: all .2s ease;
    }
</style>