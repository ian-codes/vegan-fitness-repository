<script>
    import { goto } from "$app/navigation";
    import IngredientList from "$lib/ingredients/IngredientList.svelte";
    import IngredientEditModal from "$lib/ingredients/IngredientEditModal.svelte";
    import ErrorMessage from "$lib/global/ErrorMessage.svelte";
    import Input from "$lib/global/Input.svelte";
    import TextArea from "$lib/global/TextArea.svelte";

    let recipe = {
        title: "",
        prep_time: "",
        created_by: "",
        ingredients: []
    };

    $: errors = {
        title: attemptedCreate && !recipe.title.trim(),
        prep_time: attemptedCreate && !recipe.prep_time.trim(),
        ingredients: attemptedCreate && recipe.ingredients.length < 1
    }

    let isModalOpen = false;
    let attemptedCreate = false;

    function discard() {
        goto("/recipes");
    }

    async function create() {
        attemptedCreate = true;

        const payload = {
            recipe: {
                title: recipe.title.trim(),
                description: recipe.description.trim(),
                created_by: recipe.created_by.trim() || "Anonymous Vegan",
                prep_time: recipe.prep_time.trim()
            },
            ingredients: recipe.exercises
        }

        const response = await fetch('/recipes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok && response.body) {
            console.log('Recipe created successfully');
            goto(`/recipes`);
        }
        else {
            console.error(response.error);
        } 
    }
</script>


<IngredientEditModal bind:isVisible={isModalOpen} bind:ingredients={recipe.ingredients} />

<section class="section">
    <h1>Create a Recipe</h1>

    <form class="text-white flex flex-col max-w-md w-full gap-5">
        <Input
            name="recipe-title"
            label="Title"
            bind:value={recipe.title}
            bind:isError={errors.title}
            placeholder="e.g. Protein Pancakes"
            errorMessage="Please give your recipe a title."
            optional={false}
        />

        <TextArea
            name="recipe-description"
            label="Description"
            optional={true}
            bind:value={recipe.description}
            placeholder="Describe your recipe a bit if you want to."
        />

        <div class="mt-4" class:error={errors.ingredients}>
            <IngredientList bind:ingredients={recipe.ingredients} />
        </div>
        
        <ErrorMessage 
            bind:visible={errors.ingredients} 
            message="Please add some ingredients to your recipe (at least one)."
        />

        <div class="flex flex-row justify-center gap-4">
            <button on:click={discard} class="btn btn-cancel" title="Discard">
                Discard
            </button>
            <button on:click={create} class="btn" title="Create">
                Create
            </button>
        </div>
    </form>
</section>