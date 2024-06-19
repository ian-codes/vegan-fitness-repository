
import { supabase } from "$db/supabase";
import { json } from "@sveltejs/kit";


async function addWorkout(workout) {
    const { data, error } = await supabase
        .from("workouts")
        .insert([workout])
        .select();
    if (error) throw new Error("Couldn't create workout");
    return data[0];
}


async function addExercises(exercises, newWorkoutId) {
    const exercisesWithIds = exercises.map(ex => ({
        ...ex,
        workout_id: newWorkoutId
    }));
    const { exercisesError } = await supabase
        .from("exercises")
        .insert(exercisesWithIds)
    if (exercisesError) throw new Error("Couldn't create exercises");
}


export async function POST({ request }) {
    try {
        const { workout, exercises } = await request.json();
        const newWorkout = await addWorkout(workout);
        await addExercises(exercises, newWorkout.id);
        return json({ sucess: true, workoutId: newWorkout.id });
    }
    catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}