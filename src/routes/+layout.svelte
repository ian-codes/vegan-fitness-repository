<script>
    import Footer from "$lib/global/Footer.svelte";
    import Header from "$lib/global/Header.svelte";
    import "../app.css";
</script>

<div class="fixed inset-0 pointer-events-none -z-50 bg-gradient-to-r
    from-slate-800 to-slate-900" />

<Header />
<main class="p-4 mb-20 appear">
    <div class="appear">
        <slot />
    </div>
</main>
<Footer />