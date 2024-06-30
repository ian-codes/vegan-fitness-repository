<script>
    import { topics } from "$lib/topics";
    import Card from "$lib/global/Card.svelte";
</script>


<!-- <section class="my-8 flex flex-col !text-center m-auto">
    <h1 class="text-2xl mb-4 text-white leading-normal tracking-normal font-bold 
    sm:text-4xl">
        Vegan, Community-Driven Fitness Repository.
    </h1>
    <p class="text-white text-lg !leading-relaxed
    sm:text-2xl">
        Find workout plans, recipes, tips & tricks, and more...
        <br/>
        or create your own and share with others!
    </p>
</section> -->


<section class="section gap-2">
    {#each topics as topic}
        <Card topic={topic} />
    {/each}
</section>