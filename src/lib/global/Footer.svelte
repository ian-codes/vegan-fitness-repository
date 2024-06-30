<script lang="ts">
    import Header from "./Header.svelte";
    let isOpen: boolean = false;

    let menu_items = [
        {title: "Home", slug: "/"}, 
        {title: "Workouts", slug:"/workouts"},
        // {title: "Recipes", slug:"/recipes"}, 
    ];
</script>


{#if isOpen}
    <button on:click={() => isOpen = false} class="cursor-default backdrop-blur-md fixed inset-0" />
{/if}


<footer class="px-2 py-1 bg-slate-800 bg-opacity-80 shadow-2xl shadow-white  w-full fixed bottom-0 left-0 flex justify-between">
    <span class="text-white font-lighter text-4xl">
        Ⓥ
    </span>

    <nav class="relative">
        {#if !isOpen}
            <button on:click={() => isOpen = !isOpen} 
                class="hover:bg-slate-600 rounded-full p-2 h-12 w-12 flex flex-col justify-evenly">
                {#each {length: 3} as _}
                    <span class="h-1 block bg-white w-full rounded-full" />
                {/each}
            </button>
        {:else}
            <button on:click={() => isOpen = !isOpen} 
                class="hover:bg-slate-600 rounded-full h-12 w-12 flex flex-col justify-evenly relative">
                {#each {length: 2} as _}
                    <span class="h-1 absolute bg-white w-3/4 left-1.5 rounded-full first:rotate-45 -rotate-45 origin-center" />
                {/each}
            </button>
        {/if}

        {#if isOpen}
            <ol class="bg-slate-100 rounded-md rounded-br-none shadow-slate-600 shadow-md absolute right-0 bottom-14">
                {#each menu_items as item}
                    <li class="hover:bg-slate-800  hover:text-white shadow-s shadow-blue-400">
                        <a href="{item.slug}" on:click={() => isOpen = false} class="px-4 py-3 block font-semibold">
                            {item.title}
                        </a>
                    </li>
                {/each}
            </ol>
        {/if}
    </nav>
</footer>