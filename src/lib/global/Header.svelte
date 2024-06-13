<header class="shadow-sm  shadow-slate-600 text-center p-5 drop-shadow-lg">
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
    const emotes = ["(´• ω •`)", "(─‿‿─)", "ヽ(・∀・)ﾉ", "(⌒‿⌒)", "(⁀ᗢ⁀)"]
    let emote = getRandomEmote();

    function getRandomEmote() {
        const randomIndex = Math.floor(Math.random() * emotes.length);
        return emotes[randomIndex];
    }
</script>