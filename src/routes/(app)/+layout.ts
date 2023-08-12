// src/routes/+layout.ts
import { invalidate } from '$app/navigation';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session) {
		const { data: profile } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', session.user.id)
			.limit(1)
			.single();
		const { data: winners } = await supabase.from('get_standings').select('*');
		return { supabase, session, profile, winners };
	} else return { supabase, session };
};
