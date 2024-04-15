<script lang="ts">
    import type { Topic } from "$lib/models/topics";

    export let topic: Topic = {
        title: "",
        desc: "",
        slug: "",
        img: ""
    };
</script>


<a id="{topic.title}" title="{topic.title}" href="/{topic.slug}" 
    class="mb-4 p-5 sm:m-4 cursor-pointer inline-block relative hover:scale-105 
    bg-gradient-to-br from-blue-800 to-slate-900 
    transition-all max-w-lg rounded-2xl overflow-hidden shadow-2xl">

    <h2 class="text-white mb-4 font-bold text-2xl sm:text-4xl ">{topic.title}</h2>
    <p class="text-white text-sm sm:text-xl">{topic.desc}</p>
</a>