<script>
    import { goto } from "$app/navigation";
    import ExerciseList from "$lib/components/workouts/create/ExerciseList.svelte";
    import ExerciseEditModal from "$lib/components/workouts/create/ExerciseEditModal.svelte";
    import ErrorMessage from "../../../lib/components/ErrorMessage.svelte";

    let workout = {
        title: "",
        exercises: []
    };

    let isModalOpen = false;
    let titleRef;
    
    let attemptedCreate = false;

    $: noExercises = attemptedCreate && workout.exercises.length < 1;
    $: noWorkoutTitle = attemptedCreate && workout.title === "";

    function editTitle() {
        titleRef.focus();
        workout.title = "";
    }

    function discard() {
        goto("/workouts");
    }

    async function create() {
        attemptedCreate = true;

        if (workout.title === "") {
            return;
        }

        if (workout.exercises.length === 0) {
            return;
        }

        const payload = {
            workout: {
                title: workout.title
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


<ExerciseEditModal bind:isVisible={isModalOpen} bind:exercises={workout.exercises} />

<section class="section">
    <h1>Create a Workout</h1>

    <div class="text-white flex flex-col max-w-md w-full gap-5">
        <div class:error={noWorkoutTitle} class="flex flex-row justify-center items-center gap-2">

            <input bind:this={titleRef}
                class="text-white w-full bg-transparent text-xl" 
                placeholder="Workout Title"
                bind:value={workout.title}
                required />

            <button on:click={editTitle}
                class="w-4 h-4 invert bg-no-repeat bg-contain" style="background-image: url('/edit.svg');">
        </div>

        <ErrorMessage bind:visible={noWorkoutTitle}>
            Please give your workout a title..
        </ErrorMessage>


        <div class:error={noExercises}>
            <ExerciseList bind:exercises={workout.exercises} />
        </div>
        
        <ErrorMessage bind:visible={noExercises}>
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