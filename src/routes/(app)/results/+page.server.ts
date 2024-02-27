import { fail, json, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load = async ({ locals: { supabase, getSession } }) => {
	let today = new Date().toISOString().split('T')[0];

	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.limit(1)
		.single();

	if (!profile.admin) {
		throw redirect(303, '/');
	}
	//const { data: races } = await supabase.from('races').select('*').order('date_time');

	const { data: races } = await supabase
		.from('races')
		.select('id,name,location,round,date_time,image_url,predictions(*)')
		.eq('predictions.user_id', session.user.id)

		.order('date_time');
	const { data: drivers } = await supabase.from('drivers').select('*').order('surname');
	//console.log(races);

	const { data: nextRace } = await supabase
		.from('races')
		.select('*')
		.gte('date_time', today)
		.order('date_time')
		.limit(1);

	//console.log(nextRace);
	return { session, races, nextRace, drivers };
};

export const actions = {
	update: async ({ params, request, locals: { supabase, getSession } }) => {
		console.log('Starting update');
		const formData = await request.formData();
		const raceId = formData.get('raceId') ?? null;
		const first = formData.get('first');
		const second = formData.get('second');
		const third = formData.get('third');
		const fourth = formData.get('fourth');
		const fifth = formData.get('fifth');

		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
		const { data, error } = await supabase
			.from('races')
			.update({
				first: first,
				second: second,
				third: third,
				fourth: fourth,
				fifth: fifth
			})
			.eq('id', raceId)
			.select();

		if (error) {
			return fail(500, { first, second, third, fourth, fifth });
		}
		console.log('finished update');
	},
	calcs: async ({ params, request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		//recalculate totals
		console.log('starting calcs');
		const { data: predictions } = await supabase.from('predictions_calc').select('*');

		predictions?.forEach(async (prediction) => {
			let rfirst = 0;
			let rsecond = 0;
			let rthird = 0;
			let rfourth = 0;
			let rfifth = 0;
			let rtotal = 0;

			if (prediction.pfirst == prediction.first) {
				rfirst = 13;
			} else if (
				prediction.pfirst == prediction.second ||
				prediction.pfirst == prediction.third ||
				prediction.pfirst == prediction.fourth ||
				prediction.pfirst == prediction.fifth
			) {
				rfirst = 1;
			} else {
				rfirst = 0;
			}

			if (prediction.psecond == prediction.second) {
				rsecond = 11;
			} else if (
				prediction.psecond == prediction.first ||
				prediction.psecond == prediction.third ||
				prediction.psecond == prediction.fourth ||
				prediction.psecond == prediction.fifth
			) {
				rsecond = 1;
			} else {
				rsecond = 0;
			}
			if (prediction.pthird == prediction.third) {
				rthird = 9;
			} else if (
				prediction.pthird == prediction.first ||
				prediction.pthird == prediction.second ||
				prediction.pthird == prediction.fourth ||
				prediction.pthird == prediction.fifth
			) {
				rthird = 1;
			} else {
				rthird = 0;
			}
			if (prediction.pfourth == prediction.fourth) {
				rfourth = 7;
			} else if (
				prediction.pfourth == prediction.first ||
				prediction.pfourth == prediction.second ||
				prediction.pfourth == prediction.third ||
				prediction.pfourth == prediction.fifth
			) {
				rfourth = 1;
			} else {
				rfourth = 0;
			}
			if (prediction.pfifth == prediction.fifth) {
				rfifth = 5;
			} else if (
				prediction.pfifth == prediction.first ||
				prediction.pfifth == prediction.second ||
				prediction.pfifth == prediction.third ||
				prediction.pfifth == prediction.fourth
			) {
				rfifth = 1;
			} else {
				rfifth = 0;
			}
			rtotal = rfirst + rsecond + rthird + rfourth + rfifth;
			//console.log(prediction.pid, rfirst, rsecond, rthird, rfourth, rfifth, rtotal);

			const { data, error } = await supabase
				.from('predictions')
				.update({
					points_first: rfirst,
					points_second: rsecond,
					points_third: rthird,
					points_fourth: rfourth,
					points_fifth: rfifth,
					points_total: rtotal
				})
				.eq('id', prediction.pid)
				.select();
		});
		console.log('Finished calcs');

		throw redirect(303, '/predictions');
	}
};
