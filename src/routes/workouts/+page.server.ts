import { workouts } from "$db/workouts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const data = await workouts.find({}, {projection: {
        title: 1
    }}).toArray();
    console.log('data' , data);
    return {
        workouts: data
    };
};