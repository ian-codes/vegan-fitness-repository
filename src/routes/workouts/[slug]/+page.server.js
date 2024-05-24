import { supabase } from "$db/supabase";

export async function load({ params }) {
    let { data, error } = await supabase
        .from("workouts")
        .select(`
            *,
            exercises (*)
        `)
        .eq('id', params.slug);

    if (error) console.log("error: ", error);

    return {
        workout: data ?? [],
    };
}