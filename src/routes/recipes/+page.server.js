import { supabase } from "$db/supabase";

export async function load() {
    return {
        workouts: getRecipes(),
    };
}

async function getRecipes() {
    let { data, error } = await supabase
        .from("recipes")
        .select(`
            *,
            ingredients (*)
        `);

    if (error) {
        console.log("error: ", error);
    } 

    return data;
}