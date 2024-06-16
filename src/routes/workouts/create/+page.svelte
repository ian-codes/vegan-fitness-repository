<ExerciseEditModal bind:isVisible={isModalOpen} bind:exercises={workout.exercises} />

<section class="section">
    <h1>Create a Workout</h1>

    <form class="text-white flex flex-wrap justify-between items-center max-w-md w-full gap-4">
        <fieldset class="w-full flex flex-col gap-6">
            <!-- <legend class="bg-slate-300 w-full relative">
                <button type="button" class="absolute inset-0 invisible" />
                General Infos
            </legend> -->
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
        </fieldset>

        <ErrorMessage 
            bind:visible={errors.difficulty}
            message="Please choose a difficulty for your workout."
        />

        <div class="w-full" class:error={errors.exercises}>
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


<script>
    import { goto } from "$app/navigation";
    import { difficulties } from "$lib/difficulties.js";
    import ExerciseList from "$lib/exercises/ExerciseList.svelte";
    import ExerciseEditModal from "$lib/exercises/ExerciseEditModal.svelte";
    import ErrorMessage from "$lib/global/ErrorMessage.svelte";
    import Input from "$lib/global/Input.svelte";

    let workout = {
        title: "",
        created_by: "",
        difficulty: "",
        exercises: []
    };

    $: errors = {
        title: attemptedCreate && !workout.title.trim(),
        difficulty: attemptedCreate && !workout.difficulty.trim(),
        exercises: attemptedCreate && workout.exercises.length === 0
    }

    let attemptedCreate = false;
    let isModalOpen = false;

    function discard() {
        goto("/workouts");
    }

    async function create() {
        attemptedCreate = true;

        // validate payload
        if (Object.values(errors).includes(true))
            return;

        const payload = {
            workout: {
                title: workout.title,
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