export interface Topic {
    title: string;
    desc: string;
    slug: string;
    img: string;
};

export const topics: Topic[] = [
    // {
    //     title: "Recipes",
    //     desc: "Plant-based, high-protein recipes. Healthy, easy to make and satisfying.",
    //     slug: "recipes",
    //     img: "recipes.jpg"
    // },
    {
        title: "Workouts",
        desc: "Workout programs for all levels, from beginner to advanced. With and without equipment.",
        slug: "workouts",
        img: "programs.jpg"
    }
];