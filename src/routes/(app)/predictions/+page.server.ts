import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	let today = new Date().toISOString().split('T')[0];

	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}
	const { data: predictions } = await supabase.from('all_predictions').select('*');

	//console.log(predictions);
	return { predictions };
};
