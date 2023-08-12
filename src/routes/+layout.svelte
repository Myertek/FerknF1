<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { Toaster } from 'svelte-french-toast';
	//export let data: LayoutData;
</script>

<Toaster />
<div transition:fade><slot /></div>
