<script>
    export let exercise;
    
    export function validate() {
        errors.name = !exercise.name.trim();
        errors.sets = exercise.sets == 0 || exercise.sets == null;
        errors.reps = exercise.reps == 0 || exercise.reps == null;
        return !Object.values(errors).includes(true);
    }

    $: errors = {
        name: null,
        sets: null,
        reps: null
    }
</script>

<!-- <button class="hover:bg-slate-600 transition-all" on:click={() => handleClick(exercise)}>
    <li class="flex flex-row items-center justify-between border-b border-slate-800">
        <span class="py-2">{exercise.name}</span>
        <div class="flex flex-row gap-8">
            <span class="text-end">{exercise.sets}</span>
            <span class="text-end">{exercise.reps}</span>
        </div>
    </li>
</button> -->

<li class="exercise appear relative">
    <div class="flex gap-2 flex-row items-center justify-between">
        <input 
            class:invalid={errors.name}
            bind:value={exercise.name} 
            required
            aria-required
            minlength="2"
            maxlength="99"
            class="py-2 w-full" 
            placeholder="e.g. push ups"
        />
        <div class="flex flex-row gap-2">
            <input 
                class:invalid={errors.sets}
                name="sets"
                type=number
                placeholder="3"
                min="1"
                max="99"
                required
                aria-required
                class="w-12 text-end" 
                bind:value={exercise.sets} 
            />
            <input 
                class:invalid={errors.reps}
                name="reps"
                type=number
                placeholder="10"
                min="1"
                max="99"
                required
                aria-required
                class="w-12 text-end" 
                bind:value={exercise.reps} 
            />
        </div>
    </div>
</li>


<style lang="postcss">
    input {
        @apply border-slate-600 border-[1px];
    }
    input::placeholder {
        @apply text-slate-500;
    }
    input:focus::placeholder {
        @apply !opacity-0;
    }
    .exercise:nth-child(even) input {
        @apply bg-slate-800;
    }
    .invalid {
        @apply outline-1 outline-red-500 outline;
    }
</style>