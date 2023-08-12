import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// src/routes/+layout.server.ts
export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
	return {
		session: await getSession()
	};
};
