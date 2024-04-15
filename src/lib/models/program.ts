
enum Tag {
    Cardio = "Cardio",
    Strength = "Strength",
    Hypertrophy = "Hypertrophy",
    Calisthenics = "Calisthenics",
    Bodywegith = "Bodyweight",
    Hybrid = "Hybrid",
    Crossfit = "Crossfit",
    Armwrestling = "Arm Wrestling",
    HIIT = "HIIT",
    Gym = "Gym",
    AtHome = "At home",
    Anywhere = "Anywhere",
    PullupBars = "Pullup Bars",
    DipBars = "Dip Bars",
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
    Athlete = "Athlete"
}

export interface Workout {
    title: string,
    description: string,
    level: string
}

export interface Program {
    id: string,
    title: string,
    desc?: string,
    days_per_week?: number,
    difficulty?: number,
    equipment?: boolean
    tags: Tag[]
}

export interface Routine {
    title: string,
    desc?: string,
}