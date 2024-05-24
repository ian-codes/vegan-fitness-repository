import { writable } from "svelte/store";
import { supabase } from "$db/supabase";

function createAuthStore() {
    const { subscribe, set } = writable(null);

    // Check and update the auth state on load
    supabase.auth.getSession().then(({ data: { session } }) => set(session));

    // Listen for changes in authentication status
    supabase.auth.onAuthStateChange((_event, session) => {
        set(session);
    });

    return {
        subscribe,
        signIn: (provider) => supabase.auth.signIn({ provider }),
        signOut: () => supabase.auth.signOut(),
    };
}

export const auth = createAuthStore();