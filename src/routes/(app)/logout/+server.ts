import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (session) {
		console.log('Bye!!');
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}

	return new Response();
};
