<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let form;
	console.log(form?.message);
	if (form?.message) {
		toast.error(form?.message, {
			style: 'border-radius: 200px; background: #333; color: #fff;',
			position: 'top-right'
		});
	}
</script>

<div
	class="hero min-h-screen"
	style="background-image: url(https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/backgrounds/rb.jpg);"
>
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<form method="POST" action="?/login" class="card">
			<h1 class="text-2xl font-bg-black-400 mb-8">Log in</h1>
			<div class="form-control gap-2 mb-4">
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={form?.data?.email ?? ''}
					class="input input-bordered"
				/>
				{#if form?.errors?.email}
					<label class="label">
						<span class="label-text-alt text-error">{form?.errors?.email[0]}</span>
					</label>
				{/if}
				<input
					type="password"
					name="password"
					placeholder="Password"
					class="input input-bordered"
				/>
				{#if form?.errors?.password}
					<label class="label">
						<span class="label-text-alt text-error">{form?.errors?.password[0]}</span>
					</label>
				{/if}
				<button class="btn btn-primary">Log in</button>
			</div>
		</form>
	</div>
</div>
