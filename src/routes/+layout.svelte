<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	//export let data: LayoutData;
</script>

<Toaster />
<slot />
