export interface Topic {
    title: string;
    desc: string;
    slug: string;
    img: string;
};

export const topics = [
    {
        title: "Workouts",
        desc: "Workout programs for all levels, from beginner to advanced. With and without equipment.",
        slug: "workouts",
        color: "#2762d9",
        img: "programs.jpg"
    },
    {
        title: "Recipes",
        desc: "Plant-based, high-protein recipes. Healthy, easy to make and satisfying.",
        slug: "recipes",
        color: "#3ab31e",
        img: "recipes.jpg"
    }
];