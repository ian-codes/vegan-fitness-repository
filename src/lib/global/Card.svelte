<script>
    export let topic = {
        title: "",
        desc: "",
        slug: "",
        img: ""
    };
</script>


<a id="{topic.title}" title="{topic.title}" href="/{topic.slug}" 
    class="card from-blue-800 to-slate-900 relative">

    <h2>{topic.title}</h2>
    <p>{topic.desc}</p>

    <div class="inset-0 absolute opacity-20 bg-cover bg-no-repeat bg-center w-full h-full" 
        style="background-image: url('/{topic.img}')" />
</a>