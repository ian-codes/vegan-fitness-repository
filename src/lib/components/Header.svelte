<header class="shadow-sm sticky top-0 left-0 shadow-slate-600 text-center p-5 drop-shadow-lg">
    <a href="/" title="Home">
        <span class="block text-white font-bold text-xl sm:text-3xl">
            Vegan Fitness Repository
        </span>
        <span class="text-white text-xs sm:text-sm">
            Community-Driven Knowledge Base
        </span>
        <span class="text-white block opacity-90 p-2 font-extralight text-xs">
            Made by Rumble <span>{emote}</span>
        </span>
    </a>
</header>

<script>
    import { onMount } from "svelte";

    const emotes = ["(´• ω •`)", "(─‿‿─)", "ヽ(・∀・)ﾉ", "(⌒‿⌒)", "(⁀ᗢ⁀)"]

    $: emote = emotes[3];

    function getRandomEmote() {
        const randomIndex = Math.floor(Math.random() * emotes.length);
        emote = emotes[randomIndex];
    }

    onMount(() => {
        setInterval(getRandomEmote, 3000);
    });
</script>