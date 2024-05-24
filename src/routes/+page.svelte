<script>
    import { topics } from "$lib/models/topics.ts";
    import Card from "$lib/components/Card.svelte";
</script>


<section class="my-8 flex flex-col justify-center items-center">
    <h1 class="text-2xl mb-5 text-white text-center leading-normal tracking-normal font-bold 
    sm:text-4xl">
        Vegan, Community-Driven Fitness Repository.
    </h1>
    <p class="text-white text-lg text-center leading-normal
    sm:text-2xl">
        Find workout plans, high-protein recipes, tips & tricks, and more...
        <br/>
        or contribute by publishing your own!
    </p>
</section>


<section class="section">
    {#each topics as topic}
        <Card topic={topic} />
    {/each}
</section>