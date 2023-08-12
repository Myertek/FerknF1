<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;

	if (form?.message) {
		toast.success(form.message, {
			style: 'border-radius: 200px; background: #333; color: #fff;',
			position: 'top-right'
		});
	}

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';
	export let setAvatar = (url: string) => {
		avatarUrl = url;
	};
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Profile!</h2>
		<div class="form-widget">
			<form
				class="form-widget form-control gap-2 mb-4"
				method="post"
				action="?/update"
				bind:this={profileForm}
			>
				<div>
					<label for="email">Email </label>
					<input
						id="email"
						type="text"
						value={session.user.email}
						disabled
						class="input input-bordered"
					/>
				</div>

				<div>
					<label for="fullName">Full Name</label>
					<input
						id="fullName"
						name="fullName"
						type="text"
						value={form?.fullName ?? fullName}
						class="input input-bordered"
					/>
				</div>

				<div>
					<label for="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						value={form?.username ?? username}
						class="input input-bordered"
					/>
				</div>

				<div>
					<label for="avatarUrl">Avatar Url</label>
					<input
						id="avatarUrl"
						name="avatarUrl"
						type="text"
						bind:value={avatarUrl}
						class="input input-bordered"
					/>
				</div>
				<div class="h-16">
					<div class="avatar w-10 rounded-full">
						<img src={avatarUrl} />
					</div>
				</div>
				<div class="join space-x-20 mt-2">
					<div class="join-item avatar">
						<div class="avatar w-16 rounded-full">
							<img
								type="radio"
								on:click={setAvatar(
									'https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/helmets/ver.jpg'
								)}
								src="https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/helmets/ver.jpg"
							/>
						</div>
					</div>
					<div class="join-item avatar">
						<div class="avatar w-16 rounded-full">
							<img
								type="radio"
								on:click={setAvatar(
									'https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/helmets/lec.jpg'
								)}
								src="https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/helmets/lec.jpg"
							/>
						</div>
					</div>
					<div class="join-item avatar">
						<div class="avatar w-16 rounded-full">
							<img
								type="radio"
								on:click={setAvatar(
									'https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/helmets/rus.avif'
								)}
								src="https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/helmets/rus.avif"
							/>
						</div>
					</div>
				</div>
				<div class="card-actions justify-center mt-4">
					<input
						type="submit"
						class="btn btn-primary"
						value={loading ? 'Loading...' : 'Update'}
						disabled={loading}
					/>
				</div>
			</form>
		</div>
	</div>
</div>
