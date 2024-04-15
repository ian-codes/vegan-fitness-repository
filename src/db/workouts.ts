import db from '$db/mongo';

export const workouts = db.collection('workouts');