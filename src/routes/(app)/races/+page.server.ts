import { fail, json, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { string, z } from 'zod';

const registerSchema = z.object({
	first: string({ required_error: 'First required' }).min(1).trim(),
	second: string({ required_error: 'second required' }).min(1).trim(),
	third: string({ required_error: 'third required' }).min(1).trim(),
	fourth: string({ required_error: 'fourth required' }).min(1).trim(),
	fifth: string({ required_error: 'fifth required' }).min(1).trim()
});

const arraySchema = z.array(z.string()).refine((items) => new Set(items).size === items.length, {
	message: 'Cannot have two drivers the same'
});

export const load = async ({ locals: { supabase, getSession } }) => {
	let today = new Date().toISOString().split('T')[0];

	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: races } = await supabase
		.from('races')
		.select('id,name,location,round,date_time,image_url,predictions(*)')
		.eq('predictions.user_id', session.user.id)

		.order('date_time');

	const { data: drivers } = await supabase.from('drivers').select('*').order('surname');

	const { data: nextRace } = await supabase
		.from('races')
		.select('*')
		.gte('date_time', today)
		.order('date_time')
		.limit(1);

	return { session, races, nextRace, drivers };
};

export const actions = {
	update: async ({ params, request, locals: { supabase, getSession } }) => {
		const formData = Object.fromEntries(await request.formData());

		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
		try {
			registerSchema.parse(formData);
			let pred = [formData.first, formData.second, formData.third, formData.fourth, formData.fifth];
			arraySchema.parse(pred);
		} catch (err) {
			//const { fieldErrors: errors } = err.flatten();
			const errors = err.flatten();
			//console.log({ errors });
			return fail(400, { data: formData, errors });
		}

		const { data, error } = await supabase
			.from('predictions')
			.update({
				first: formData.first,
				second: formData.second,
				third: formData.third,
				fourth: formData.fourth,
				fifth: formData.fifth
			})
			.eq('id', formData.prediction_id)
			.select();

		if (error) {
			return fail(500, { message: 'Failed to update prediction' });
		}
		return { success: true, message: 'Update successful' };
		//throw redirect(303, '/predictions');
	},

	create: async ({ params, request, locals: { supabase, getSession } }) => {
		const formData = Object.fromEntries(await request.formData());
		// const formData = await request.formData();
		// const pred_id = formData.get('prediction_id') ?? null;
		// const race_id = formData.get('race_id');
		// const first = formData.get('first');
		// const second = formData.get('second');
		// const third = formData.get('third');
		// const fourth = formData.get('fourth');
		// const fifth = formData.get('fifth');

		const session = await getSession();
		if (!session) {
			throw redirect(303, '/predictions');
		}

		try {
			const result = registerSchema.parse(formData);
			let pred = [formData.first, formData.second, formData.third, formData.fourth, formData.fifth];
			arraySchema.parse(pred);
		} catch (err) {
			const errors = err.flatten();
			//console.log({ errors });
			console.log(errors);
			return fail(400, { data: formData, errors });
		}

		const { data, error } = await supabase.from('predictions').insert({
			user_id: session.user.id,
			race_id: formData.race_id,
			first: formData.first,
			second: formData.second,
			third: formData.third,
			fourth: formData.fourth,
			fifth: formData.fifth
		});

		console.log(error);
		if (error) {
			return fail(500, { data: formData, error });
		}

		// return {
		// 	first,
		// 	second,
		// 	third,
		// 	fourth,
		// 	fifth
		// };
		return { success: true, message: 'Create successful' };
	}
};
