export type Workout = {
    title: string,
    description?: string,
    exercises: Exercise[]
}

export type Exercise = {
    name: string,
    sets: number,
    reps: number
}

export class ExerciseClass {
    
}