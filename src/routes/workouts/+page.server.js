import { supabase } from "$db/supabase";

export async function load() {
    return {
        workouts: getWorkouts(),
    };
}

async function getWorkouts() {
    let { data, error } = await supabase
        .from("workouts")
        .select(`
            *,
            exercises (*)
        `);

    if (error) {
        console.log("error: ", error);
    } 

    return data;
}