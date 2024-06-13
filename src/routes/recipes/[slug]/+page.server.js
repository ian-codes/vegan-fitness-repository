import { supabase } from "$db/supabase";

export async function load({ params }) {
    return {
        workout: getRecipe(params.slug)
    };
}

async function getRecipe(id) {
    let { data, error } = await supabase
        .from("recipes")
        .select(`
            *,
            ingredients (*)
        `)
        .eq('id', id);

    if (error) {
        console.log("error: ", error)
    };

    return data;
}