<script>
    export let workout;

    let isCollapsed = false;
</script>


<fieldset class="rounded-lg overflow-hidden flex flex-col gap-2 bg-gradient-to-br from-blue-800 to-slate-900">
    <button on:click={() => isCollapsed = !isCollapsed}
        class="p-4 flex transition-all flex-row shadow-slate-300 shadow-sm items-center justify-between hover:bg-slate-600">
        
        <span class="text-2xl">Infos</span>
        <span class="w-5 h-5 invert" style="background-image: url(/collapse.svg);" />
    </button>

    {#if !isCollapsed}
        <div class="flex flex-col gap-2 p-2">
            <label for="title">Workout Title</label>
            <input class="text-black" type="text" name="title" value="{workout.title}" placeholder="e.g. upper body workout" />
        </div>
    
        <div class="flex flex-col gap-2 p-2">
            <label for="description">Description</label>
            <input class="text-black" type="text" name="description" value="{workout.description}" placeholder="e.g. perform each set with 3 minutes rest" />
        </div>
    {/if}
</fieldset>