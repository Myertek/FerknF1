<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<div
	class="hero min-h-screen"
	style="background-image: url(https://gqrrdsfulvxrzbqznkdi.supabase.co/storage/v1/object/public/images/backgrounds/rb.jpg);"
>
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Ferk 'n' F1 Trophy</h1>
			<p class="mb-5">Hello and welcome to 2024 Ferk 'n' F1 trophy.</p>

			<div class="flex-1">
				<a href="/login" class="btn btn-primary normal-case text-xl">Let's Go!</a>
			</div>
		</div>
	</div>
</div>
