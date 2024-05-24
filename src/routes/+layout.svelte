<script>
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";
    import "../app.css";
</script>

<div class="fixed inset-0 pointer-events-none -z-50 bg-gradient-to-r
    from-slate-800 to-slate-900" />

<Header />
<main class="px-4 mb-20">
    <slot />
</main>
<Footer />