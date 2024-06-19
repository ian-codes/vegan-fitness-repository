<ExerciseEditModal bind:isVisible={isModalOpen} bind:exercises={workout.exercises} />

<section class="section w-fit m-auto py-8 rounded-lg">
    <h1>Create a Workout</h1>

    <form class="text-white flex flex-wrap gap-6 justify-between items-center max-w-md">
        <fieldset class="w-full flex flex-col gap-6 shadow-md bg-slate-800 p-6 rounded-lg">
            <h2 class="text-xl w-full relative">
                <button on:click={handleInfosClick} 
                    type="button" 
                    class="infos-button absolute inset-0">
                    <span 
                        style="background-image: url('/expand.svg')"
                        class="{infosOpen ? "rotate-180" : ""} absolute right-0 
                        top-0 w-4 h-4 block bg-no-repeat
                        invert bg-contain bg-center" />
                </button>
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
                        <label for="select-workout-level">Level *</label>
                        <select class:error={errors.difficulty} 
                            class="text-white bg-transparent placeholder-white"
                            bind:value={workout.difficulty}
                            placeholder="Select difficulty">
            
                            <option value="" disabled selected>Select level</option>
                            {#each difficulties as difficulty}
                                <option value="{difficulty}">{difficulty}</option>
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

        <ErrorMessage 
            bind:visible={errors.difficulty}
            message="Please choose a difficulty for your workout."
        />

        <div class="w-full shadow-md bg-slate-800 p-6 rounded-lg" class:error={errors.exercises}>
            <ExerciseList bind:exercises={workout.exercises} />
        </div>
        
        <ErrorMessage 
            bind:visible={errors.exercises}
            message="Please add some exercises to your workout (at least one)." 
        />
            
        <div class="mt-10 flex flex-row w-full justify-center gap-4">
            <button on:click={discard} type="button" class="btn btn-cancel" title="Discard">
                Discard
            </button>
            <button on:click={create} type="button" class="btn" title="Create">
                Create
            </button>
        </div>
    </form>
</section>

<style lang="postcss">
    .infos-button > span {
        @apply outline-none rounded-full;
        transition: all .2s ease;
    }
    .infos-button:hover > span {
        @apply outline-1 outline outline-black;
    }
</style>


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
        title: attemptedCreate && !workout.title.trim(),
        notes: attemptedCreate && !workout.notes.trim(),
        difficulty: attemptedCreate && !workout.difficulty.trim(),
        exercises: attemptedCreate && workout.exercises.length === 0
    }

    let infosOpen = true;
    let attemptedCreate = false;
    let isModalOpen = false;

    function discard() {
        goto("/workouts");
    }

    function handleInfosClick() {
        infosOpen = !infosOpen;
    }

    async function create() {
        attemptedCreate = true;

        if (Object.values(errors).includes(true))
            return;

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
</script>