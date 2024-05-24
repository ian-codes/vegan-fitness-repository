import { supabase } from "$db/supabase";
import { json } from "@sveltejs/kit";



export async function GET({ request }) {
    try {
        const url = new URL(request.url);
        const provider = url.searchParams.get('provider');
        if (!provider) {
            throw new Error('Provider is required');
        }
        const discordUrl = await signInWithDiscord(provider);
        return json({ success: true, discordUrl });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 400 });
    }
}


async function signInWithDiscord(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider
    });
    if (error) {
        console.error(error);
        throw new Error('Failed to authenticate with provider');
    }
    return data.url;
}
