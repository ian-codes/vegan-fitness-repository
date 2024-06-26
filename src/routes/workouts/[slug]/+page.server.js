import { supabase } from "$db/supabase";

export async function load({ params }) {
    return {
        workout: getWorkout(params.slug)
    };
}

async function getWorkout(id) {
    let { data, error } = await supabase
        .from("workouts")
        .select(`
            *,
            exercises (*)
        `)
        .eq('id', id);

    if (error) {
        console.log("error: ", error)
    };

    return data;
}