
import { supabase } from "$db/supabase";
import { json } from "@sveltejs/kit";


async function addRecipe(recipe) {
    const { data, error } = await supabase
        .from("recipes")
        .insert([recipe])
        .select();
    if (error) throw new Error("Couldn't create recipe.");
    return data[0];
}


async function addIngredients(ingredients, newRecipeId) {
    const ingredientsWithIds = ingredients.map(ex => ({
        ...ex,
        recipe_id: newRecipeId
    }));
    const { exercisesError: ingredientsError } = await supabase
        .from("ingredients")
        .insert(ingredientsWithIds)
    if (ingredientsError) throw new Error("Couldn't create ingredients.");
}


export async function POST({ request }) {
    try {
        const { recipe, ingredients } = await request.json();
        const newRecipe = await addRecipe(recipe);
        await addIngredients(ingredients, newRecipe.id);
        return json({ sucess: true, recipeId: newRecipe.id });
    }
    catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}