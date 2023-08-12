<script lang="ts">
	import { Result } from 'postcss';
	import type { PageData } from './$types';

	export let data: PageData;
	let raceresults;
	let raceId = 0;
	let first = 0;
	let second = 0;
	let third = 0;
	let fourth = 0;
	let fifth = 0;

	export const getData = async (season: string, round: string, rid: number) => {
		console.log('Getting race results');

		const response = await fetch(
			'http://ergast.com/api/f1/' + season + '/' + round + '/results.json'
		);

		if (response.headers.get('content-type')?.includes('application/json')) {
			try {
				raceresults = (await response.json()).MRData.RaceTable.Races[0].Results;
			} catch (error) {
				raceId = first = second = third = fourth = fifth = 0;

				return error;
			}

			//console.log(raceresults);
			//get top 5 driver id from Drivers table
			raceId = rid;
			let result = data.drivers?.find((driver) => driver.code == raceresults[0].Driver.code);
			first = result.id;
			result = data.drivers?.find((driver) => driver.code == raceresults[1].Driver.code);
			second = result.id;
			result = data.drivers?.find((driver) => driver.code == raceresults[2].Driver.code);
			third = result.id;
			result = data.drivers?.find((driver) => driver.code == raceresults[3].Driver.code);
			fourth = result.id;
			result = data.drivers?.find((driver) => driver.code == raceresults[4].Driver.code);
			fifth = result.id;
			console.log('Finished getting race results');

			return { raceresults };
		}
	};
</script>

<form method="POST" action="?/update">
	<div><input type="number" bind:value={raceId} name="raceId" /></div>
	<div><input type="number" bind:value={first} name="first" /></div>
	<div><input type="number" bind:value={second} name="second" /></div>
	<div><input type="number" bind:value={third} name="third" /></div>
	<div><input type="number" bind:value={fourth} name="fourth" /></div>
	<div><input type="number" bind:value={fifth} name="fifth" /></div>
	<div class="card-actions justify-end">
		<button type="submit" class="btn btn-primary">Update</button>
	</div>
</form>
<form method="POST" action="?/calcs">
	<div class="card-actions justify-end">
		<button type="submit" class="btn btn-primary">Calculate</button>
	</div>
</form>
{#each data.races as race}
	<div class="flex-1 mt-2">
		<button
			type="submit"
			on:click={getData('2023', race.round, race.id)}
			class="flex-1 btn btn-primary">Get Results for round {race.round} {race.name}</button
		>
	</div>
{/each}
