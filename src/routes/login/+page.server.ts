import { fail, redirect } from '@sveltejs/kit';
import { string, z } from 'zod';

const registerSchema = z.object({
	email: string({ required_error: 'Email is required' }).email(),
	password: string({ required_error: 'Password is required' })
		.min(8, { message: 'Password error' })
		.max(15, { message: 'Password error' })
		.trim()
});

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());
		let email = '';
		let password = '';
		try {
			const result = registerSchema.parse(formData);
			email = result.email;
			password = result.password;
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();
			//strip out password before returnin form data
			const { password, ...rest } = formData;

			return fail(400, { data: rest, errors });
		}
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return fail(500, { message: 'Login details incorrect!.', success: false });
		}

		throw redirect(303, '/');
	}
};
