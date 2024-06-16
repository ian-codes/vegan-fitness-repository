<script>
    import IngredientEditModal from "./IngredientEditModal.svelte";

    export let ingredients = [];

    let isModalOpen = false;
    let selectedIngredient;

    function handleClick(ingredient) {
        selectedIngredient = ingredient;
        isModalOpen = true;
    };

    function newIngredient() {
        isModalOpen = true;
        selectedIngredient = {
            name: "",
            amount: "",
            unit: 0
        };
    }
</script>


<IngredientEditModal bind:isVisible={isModalOpen} bind:ingredient={selectedIngredient} bind:ingredients={ingredients} />

<section class="flex flex-col gap-5">
    <div class="flex flex-row items-center justify-between">
        <h2 class="mb-4 text-xl text-center">Ingredients ({ingredients.length})</h2>

        <button class="btn-plain" on:click={newIngredient}>
            Add Ingredient
        </button>
    </div>

    <ol class="flex flex-col gap-1">
        {#if ingredients.length != 0}
            <div class="font-bold flex flex-row items-center justify-between">
                <span>Name</span>
                <div class="flex flex-row gap-5">
                    <span>Amount</span>
                    <span>Unit</span>
                </div>
            </div>
        {/if}

        {#each ingredients as ingredient}
            <button class="hover:bg-slate-600 transition-all" on:click={() => handleClick(ingredient)}>
                <li class="flex flex-row items-center justify-between border-b border-slate-800">
                    <span class="py-2">{ingredient.title}</span>
                    <div class="flex flex-row gap-8">
                        <span class="text-end">{ingredient.amount}</span>
                        <span class="text-end">{ingredient.unit}</span>
                    </div>
                </li>
            </button>
        {/each}
    </ol>
</section>
