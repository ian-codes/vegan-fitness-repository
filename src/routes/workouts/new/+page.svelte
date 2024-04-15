<script lang="ts">
    import type { Workout, Exercise } from "$lib/models/workout.ts";
    import ExerciseNew from "$lib/components/workouts/create/ExerciseNew.svelte";
    import Button from "$lib/components/Button.svelte";
    import WorkoutInfos from "$lib/components/workouts/create/WorkoutInfos.svelte";
    import ExerciseList from "$lib/components/workouts/create/ExerciseList.svelte";
    import ExerciseEditModal from "$lib/components/workouts/create/ExerciseEditModal.svelte";

    let exercises: Exercise[] = [];

    let workout: Workout = {
        title: "",
        description: "",
        exercises: [
            {name: "shoulder press", sets: 2, reps: 12},
            {name: "pull ups", sets: 2, reps: 12}
        ]
    };

    let isModalOpen: boolean = false;
    let titleRef: HTMLElement;

    function editTitle() {
        titleRef.focus();
        workout.title = "";
    }

    function discard() {
        workout = {
            title: "",
            exercises: []
        }
    }

    function openModal() : void {
        isModalOpen = true;
    };

    function publish() {
        console.log("published!");
    }
</script>


<ExerciseEditModal bind:isVisible={isModalOpen} bind:exercises={workout.exercises} />

<section class="my-9 flex flex-col justify-center items-center">
    <h1>Create a Workout</h1>

    <div class="text-white flex flex-col max-w-md w-full gap-5">
        <div class="flex flex-row justify-center items-center gap-2">

            <input bind:this={titleRef}
                class="text-white w-full bg-transparent text-xl" 
                placeholder="Workout Title"
                bind:value={workout.title}
                required />

            <button on:click={editTitle}
                class="w-4 h-4 invert bg-no-repeat bg-contain" style="background-image: url('/edit.svg');">
        </div>

        <ExerciseList bind:exercises={workout.exercises} />
    
        <!-- <ExerciseNew onAdd={addExercise} exercises={workout.exercises} />
        <WorkoutInfos workout={workout} /> -->

        <div class="flex flex-row justify-center gap-4">
            <Button onClick={discard} title="Discard" />
            <Button onClick={publish} title="Publish" />
        </div>
    </div>
</section>