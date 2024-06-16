<script>
    import { page } from "$app/stores";
    import Back from "$lib/global/Back.svelte";

    export const config = {
        runtime: 'nodejs18.x'
    };

    function getParentPath(pathname) {
        let lastSlashIndex = pathname.lastIndexOf('/');
        return lastSlashIndex > 0 ? pathname.substring(0, lastSlashIndex) : '/';
    }

    $: backUrl = getParentPath($page.url.pathname);
</script>


<Back url={backUrl} />
<slot />