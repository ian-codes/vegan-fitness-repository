<ExerciseEditModal bind:isVisible={isModalOpen} bind:exercises={workout.exercises} />

<section class="section">
    <h1>Create a Workout</h1>

    <div class="text-white flex flex-col max-w-md w-full gap-5">
        <div class:error={errors.title} class="flex flex-row justify-center items-center gap-2">

            <input bind:this={titleRef}
                class="text-white w-full bg-transparent text-xl" 
                placeholder="Workout Title"
                bind:value={workout.title}
                required>

            <button on:click={editTitle}
                class="w-4 h-4 invert bg-no-repeat bg-contain" style="background-image: url('/edit.svg');">
        </div>

        <ErrorMessage bind:visible={errors.title}>
            Please give your workout a title.
        </ErrorMessage>

        <div class="flex flex-row justify-between">
            <div class="flex flex-row justify-center items-center gap-2">
                <input 
                    class="text-white w-full bg-transparent text-xl" 
                    placeholder="Created By"
                    bind:value={workout.created_by}
                    required />
    
                <button class="w-4 h-4 invert bg-no-repeat bg-contain" style="background-image: url('/edit.svg');">
            </div>

            <select class:error={errors.difficulty} 
                class="text-white bg-transparent placeholder-white"
                bind:value={workout.difficulty}
                placeholder="Select difficulty">

                <option value="" disabled selected>Choose difficulty</option>
                {#each difficulties as difficulty}
                    <option value="{difficulty}">{difficulty}</option>
                {/each}
            </select>
        </div>

        <ErrorMessage bind:visible={errors.difficulty}>
            Please choose a difficulty for your workout.
        </ErrorMessage>

        <div class:error={errors.exercises}>
            <ExerciseList bind:exercises={workout.exercises} />
        </div>
        
        <ErrorMessage bind:visible={errors.exercises}>
            Please add some exercises to your workout (at least one).
        </ErrorMessage>

        <div class="flex flex-row justify-center gap-4">
            <button on:click={discard} class="btn btn-cancel" title="Discard">
                Discard
            </button>
            <button on:click={create} class="btn" title="Create">
                Create
            </button>
        </div>
    </div>
</section>


<script>
    import { goto } from "$app/navigation";
    import { difficulties } from "$lib/difficulties.js";
    import ExerciseList from "$lib/exercises/ExerciseList.svelte";
    import ExerciseEditModal from "$lib/exercises/ExerciseEditModal.svelte";
    import ErrorMessage from "$lib/global/ErrorMessage.svelte";

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
    let titleRef;
    
    function editTitle() {
        titleRef.focus();
        workout.title = "";
    }

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