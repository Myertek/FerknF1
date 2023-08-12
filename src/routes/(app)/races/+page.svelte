<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	import toast from 'svelte-french-toast';

	export let data;
	export let form;
	const formErrors = form?.errors?.formErrors[0] ?? '';
	const fieldErrors = form?.errors?.fieldErrors ?? '';

	if (fieldErrors) {
		toast.error('Missing a driver selection', {
			style: 'border-radius: 200px; background: #333; color: #fff;',
			position: 'top-right'
		});
	}
	if (formErrors) {
		toast.error(formErrors, {
			style: 'border-radius: 200px; background: #333; color: #fff;',
			position: 'top-right'
		});
	}
	if (form?.message) {
		toast.success(form.message, {
			style: 'border-radius: 200px; background: #333; color: #fff;',
			position: 'top-right'
		});
	}
	let { races, nextRace, drivers } = data;
	$: ({ races, nextRace, drivers } = data);

	export let pred_id = null;
	export let race_id = null;
	export let first = null;
	export let second = null;
	export let third = null;
	export let fourth = null;
	export let fifth = null;

	export function localDate(d: string) {
		return new Date(d).toLocaleString();
	}
</script>

<div class="race w-full flex-1 mt-28">
	{#each races as race}
		<div hidden>
			{(race_id = race.id)}
			{(pred_id = race.predictions[0]?.id ?? null)}
			{(first = race.predictions[0]?.first ?? null)}
			{(second = race.predictions[0]?.second ?? null)}
			{(third = race.predictions[0]?.third ?? null)}
			{(fourth = race.predictions[0]?.fourth ?? null)}
			{(fifth = race.predictions[0]?.fifth ?? null)}
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->

		<div tabindex="-1" class="collapse collapse-arrow border border-base-300 bg-base-200 mb-2 mt-2">
			{#if nextRace[0].id === race.id}
				<input type="radio" name="my-accordion-1" checked />
			{:else}<input type="radio" name="my-accordion-1" />
			{/if}

			<div class="collapse-title flex-1 text-xl font-medium">
				<div class="flex justify-between">
					<div class="flex-1">Round:{race?.round}</div>
					<div>{race?.name}</div>
				</div>
				<div class="flex">
					{localDate(race?.date_time)}
				</div>
			</div>

			<div class="collapse-content">
				<img src={race?.image_url} alt={race?.location} />
				<div class="mt-2" />
				<!-- prediction -->
				{#if pred_id}
					<form method="POST" action="?/update">
						<div class="card flex bg-neutral text-neutral-content">
							<div class="card-body items-center text-center">
								<h2 class="card-title">Prediction</h2>
								<input type="number" bind:value={pred_id} name="prediction_id" hidden />
								<input type="number" bind:value={race.id} name="race_id" hidden />
								<div class="flex">{race.name}</div>
								<div class="form-control w-full max-w-xs">
									<select
										bind:value={race.predictions[0].first}
										name="first"
										class="select select-bordered"
									>
										<option disabled selected>Pick 1st Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select
										bind:value={race.predictions[0].second}
										name="second"
										class="select select-bordered"
									>
										<option disabled selected>Pick 2nd Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select
										bind:value={race.predictions[0].third}
										name="third"
										class="select select-bordered"
									>
										<option disabled selected>Pick 3rd Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select
										bind:value={race.predictions[0].fourth}
										name="fourth"
										class="select select-bordered"
									>
										<option disabled selected>Pick 4th Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select
										bind:value={race.predictions[0].fifth}
										name="fifth"
										class="select select-bordered"
									>
										<option disabled selected>Pick 5th Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="card-actions justify-end">
									<button type="submit" class="btn btn-primary">Update</button>
								</div>
							</div>
						</div>
					</form>
				{:else}
					<form method="POST" action="?/create">
						<div class="card flex bg-neutral text-neutral-content">
							<div class="card-body items-center text-center">
								<h2 class="card-title">Prediction</h2>
								<input type="number" bind:value={race.id} name="race_id" hidden />
								<div class="flex">{race.name}</div>
								<div class="form-control w-full max-w-xs">
									<select name="first" class="select select-bordered">
										<option disabled selected>Pick 1st Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select name="second" class="select select-bordered">
										<option disabled selected>Pick 2nd Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select name="third" class="select select-bordered">
										<option disabled selected>Pick 3rd Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select name="fourth" class="select select-bordered">
										<option disabled selected>Pick 4th Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="form-control w-full max-w-xs">
									<select name="fifth" class="select select-bordered">
										<option disabled selected>Pick 5th Place</option>
										{#each data.drivers as driver}
											<option value={driver.id}>
												{driver.surname}
											</option>
										{/each}
									</select>
								</div>
								<div class="card-actions justify-end">
									<button type="submit" class="btn btn-primary">Create</button>
								</div>
							</div>
						</div>
					</form>
				{/if}

				<!-- end prediction-->
			</div>
		</div>
	{/each}
</div>
