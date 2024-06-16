<script>
    import ErrorMessage from "$lib/global/ErrorMessage.svelte";
    import Button from "$lib/global/Button.svelte";
    export let isVisible = false;

    let defaultIngredient = {
        name: "",
        amount: 0,
        unit: 0
    }

    let attemptedSave = false;

    export let ingredient = defaultIngredient;
    export let ingredients = [];

    let isEditingExistingIngredient = ingredient == defaultIngredient;

    $: noName = attemptedSave && !ingredient.name.trim();
    $: noAmount = attemptedSave && !ingredient.amount.trim();
    $: noUnit = attemptedSave && ingredient.unit.trim();

    function cancel() {
        ingredient = defaultIngredient;
        isVisible = false;
        attemptedSave = false;
    }

    function save() {
        attemptedSave = true;

        if (!ingredient.name.trim()) return;
        if (!ingredient.amount.trim()) return;
        if (!ingredient.unit.trim()) return;

        if (!ingredients.includes(ingredient)) {
            ingredients.push(ingredient);
        }
        else {
            const pos = ingredients.map(e => e.name).indexOf(ingredient.name);
            if (ingredients[pos] != ingredient) {
                ingredients[pos] = ingredient;
            }
        }
        ingredients = ingredients;
        ingredient = defaultIngredient;

        isVisible = false;
        attemptedSave = false;
    }

    function deleteIngredient() {
        ingredients = ingredients.filter(e => e.name != ingredient.name);
        ingredient = defaultIngredient;
        isVisible = false;
        attemptedSave = false;
    }
</script>


{#if isVisible}
    <div class="z-50 text-center flex gap-5 flex-col items-center justify-center absolute inset-0
    bg-slate-800 bg-opacity-80 backdrop-blur-md">
        <div class:error={noName} class="flex flex-col gap-1">
            <label class="text-center" for="name">Name</label>
            <input bind:value={ingredient.name} 
                class="text-center"
                placeholder="Ingredient name"
                name="name" type="text" required />
        </div>

        <ErrorMessage visible={noName}>
            Please give the ingredient a name.
        </ErrorMessage>

        <div class:error={noAmount} class="flex flex-col gap-1">
            <label for="amount">Amount</label>
            <input bind:value={ingredient.amount} 
                class="text-center"
                name="amount" type="number" required />
        </div>

        <ErrorMessage visible={noUnit}>
            Please add at least 1 set.
        </ErrorMessage>

        <div class:error={noUnit} class="flex flex-col gap-1">
            <label class="text-center" for="unit">Unit</label>
            <input bind:value={ingredient.unit} 
                class="text-center"
                name="unit" type="text" required />
        </div>

        <ErrorMessage visible={noUnit}>
            Please add a unit (e.g. kg, g, cups).
        </ErrorMessage>

        <div>
            <Button onClick={cancel} title="Cancel" />
            <Button onClick={save} title="Save" />
        </div>

        {#if isEditingExistingIngredient}
            <Button onClick={deleteIngredient} title="Delete" />
        {/if}
    </div>
{/if}

