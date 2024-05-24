import { supabase } from "$db/supabase";

export async function load() {
    let { data, error } = await supabase
        .from("workouts")
        .select(`
            *,
            exercises (*)
        `);

    if (error) console.log("error: ", error);

    return {
        workouts: data ?? [],
    };
}