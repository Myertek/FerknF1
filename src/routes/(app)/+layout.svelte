<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import type { LayoutServerData } from './$types.js';
	export let data;

	let { supabase, session, profile, winners } = data;
	$: ({ supabase, session, profile, winners } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<header class="flex-1 h-16 z-30 sticky top-0 w-full">
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/races" class="btn btn-ghost normal-case text-xl">Races</a>
		</div>
		<div class="flex-1">
			<a href="/predictions" class="btn btn-ghost normal-case text-xl">Predictions</a>
		</div>
		{#if profile}
			{#if profile?.admin}
				<div class="flex-1">
					<a href="/results" class="btn btn-ghost normal-case text-xl">Results</a>
				</div>
			{/if}
		{/if}

		<div class="flex-none gap-2">
			<div>
				{#if profile}
					{profile?.username}
				{/if}
			</div>

			<div class="dropdown dropdown-end">
				<label tabindex="-1" class="btn btn-ghost btn-circle avatar">
					{#if session}
						<div class="w-10 rounded-full">
							<img src={profile?.avatar_url} alt="FF1" />
						</div>
					{:else}
						<div class="avatar online placeholder">
							<div class="bg-neutral-focus text-neutral-content rounded-full w-10">
								<span class="text-xl">FF1</span>
							</div>
						</div>
					{/if}
				</label>
				<ul
					tabindex="-1"
					class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
				>
					<li>
						<a href="/profile" class="mt-2 ml-3 text-lg"> Profile </a>
					</li>

					<li>
						{#if session}
							<li>
								<form action="/logout" method="POST">
									<button class="text-lg mt-2" type="submit">Logout</button>
								</form>
							</li>
						{:else}
							<li><a href="/login">Login</a></li>
						{/if}
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="navbar bg-base-100">
		<!--{#each winners as winner}-->
		<div class="flex-1 ml-6">
			<div class="flex-1 text-yellow-500 ml-6">
				{winners[0]?.username ?? ''}
				{winners[0]?.total ?? ''}
			</div>
			<div class="flex-1 ml-6">{winners[1]?.username ?? ''} {winners[1]?.total ?? ''}</div>
			<div class="flex-1 text-amber-700 ml-6">
				{winners[2]?.username ?? ''}
				{winners[2]?.total ?? ''}
			</div>
		</div>
		<!--{/each}-->
	</div>
</header>
<div class="mt-12 mb-60">
	<slot />
</div>

<footer
	class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600"
>
	<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 </span>
</footer>
