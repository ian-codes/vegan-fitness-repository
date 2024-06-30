<script>
    import { goto } from "$app/navigation";
    import { difficulties } from "$lib/difficulties.js";
    import ExerciseList from "$lib/exercises/ExerciseList.svelte";
    import ExerciseEditModal from "$lib/exercises/ExerciseEditModal.svelte";
    import ErrorMessage from "$lib/global/ErrorMessage.svelte";
    import Input from "$lib/global/Input.svelte";
    import TextArea from "$lib/global/TextArea.svelte";

    let workout = {
        title: "",
        notes: "",
        created_by: "",
        difficulty: "",
        exercises: []
    };

    $: errors = {
        title: null,
        difficulty: null,
        exercises: null,
    }

    let infosOpen = true;
    let attemptedCreate = false;
    let isModalOpen = false;
    let areExercisesValid = false;
    let exerciseListRef;

    function discard() {
        goto("/workouts");
    }

    function handleInfosClick() {
        // goto("#general-info");
        infosOpen = !infosOpen;
    }

    async function create() { 
        attemptedCreate = true;

        exerciseListRef.validate();

        if (!validateWorkoutData()) {
            return;
        }

        console.log("hello")
        const payload = {
            workout: {
                title: workout.title,
                notes: workout.notes,
                created_by: workout.created_by.trim() || "Anonymous",
                difficulty: workout.difficulty
            },
            exercises: workout.exercises
        }

        const response = await fetch('/workouts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok && response.body) {
            console.log('Workout created successfully');
            goto(`/workouts`);
        }
        else {
            console.error(response.error);
        } 
    }

    function validateWorkoutData() {
        errors.title = !workout.title.trim();
        errors.difficulty = !workout.difficulty.trim();
        errors.exercises = workout.exercises.length == 0;
        console.log(errors)
        let isValid = !Object.values(errors).includes(true);
        console.log(isValid)
        return isValid;
    }
</script>


<ExerciseEditModal bind:isVisible={isModalOpen} bind:exercises={workout.exercises} />

<section class="section w-fit m-auto py-8 rounded-lg">
    <h1>Create a Workout</h1>

    <form class="text-white flex flex-wrap gap-6 justify-between items-center max-w-md">
        <div class="w-full shadow-md rounded-lg" class:error={errors.exercises}>
            <ExerciseList 
                bind:this={exerciseListRef}
                bind:exercises={workout.exercises} 
            />
        </div>

        <fieldset id="general-info" 
            class="w-full flex flex-col gap-6 shadow-md rounded-lg">

            <h2 class="flex items-center gap-2 text-xl !mb-0 w-full relative">
                <button on:click={handleInfosClick} 
                    type="button" 
                    class="infos-button absolute inset-0">
                </button>

                <span 
                    style="background-image: url('/expand.svg')"
                    class="{infosOpen ? "rotate-180" : ""} w-4 h-4 block bg-no-repeat
                    invert bg-contain bg-center pointer-events-none" 
                />
                General Info
            </h2>
            {#if infosOpen}
                <div class="w-full">
                    <Input 
                        name="workout-title"
                        label="Title"
                        placeholder="e.g. Full Body Workout"
                        bind:value={workout.title}
                        bind:isError={errors.title}
                        errorMessage="Please give your workout a title."
                    />
                </div>
                <div class="w-full">
                    <TextArea 
                        bind:value={workout.notes}
                        name="workout-notes"
                        label="Notes"
                        placeholder="e.g. Rest 2 minutes between each set."
                        optional={true}
                    />
                </div>

                <div class="w-full gap-4 flex flex-wrap items-center justify-between">
                    <div class="w-min h-full flex flex-col gap-1">
                        <label for="select-workout-level">
                            Level *
                        </label>

                        <select class:error={errors.difficulty} 
                            class="text-white bg-transparent placeholder-white"
                            bind:value={workout.difficulty}
                            placeholder="Select difficulty">
            
                            <option value="" disabled selected>
                                Select level
                            </option>

                            {#each difficulties as difficulty}
                                <option value="{difficulty}">
                                    {difficulty}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <Input
                        name="workout-author"
                        label="Created By"
                        optional=true
                        placeholder="Anonymous Vegan"
                        bind:value={workout.created_by}
                    />
                </div>
            {/if}
        </fieldset>

        <div class="mt-10 flex flex-row w-full justify-center gap-4">
            <button on:click={discard} type="button" class="btn btn-cancel" title="Discard">
                Discard
            </button>
            <button on:click={create} type="button" class="btn" title="Create">
                Create Workout
            </button>
        </div>
    </form>
</section>


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
