<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let raceName = '';
	export function nameCheck(name: string): boolean {
		if (raceName == name) {
			return true;
		} else {
			raceName = name;
			return false;
		}
	}

	export function raceStarted(d: string) {
		let raceDate = new Date(d);
		let currentDate = new Date();
		return raceDate.valueOf() < currentDate.valueOf();
	}
</script>

<div class="overflow-y-auto mt-20">
	<table class="table table-pin-rows">
		<!-- head -->
		<thead class="font-bold text-slate-400 text-sm">
			<tr>
				<th>RACE</th>
				<th>1st</th>
				<th>2nd</th>
				<th>3rd</th>
				<th>4th</th>
				<th>5th</th>
			</tr>
		</thead>

		<tbody>
			{#each data.predictions as prediction}
				{#if !nameCheck(prediction.name)}
					<tr><th colSpan={6}>{prediction.name}</th></tr>
					<tr>
						<td>
							<div class="flex items-center text-green-400">
								<div>
									<div class="">Result</div>
								</div>
							</div>
						</td>
						<td>
							<div class="flex items-center text-green-400">
								<div>
									<div class="">{prediction.rfirst}</div>
								</div>
							</div>
						</td>
						<td>
							<div class="flex items-center text-green-400">
								<div>
									<div class="">{prediction.rsecond}</div>
								</div>
							</div>
						</td>
						<td>
							<div class="flex items-center text-green-400">
								<div>
									<div class="">{prediction.rthird}</div>
								</div>
							</div>
						</td>
						<td>
							<div class="flex items-center text-green-400">
								<div>
									<div class="">{prediction.rfourth}</div>
								</div>
							</div>
						</td>
						<td>
							<div class="flex items-center text-green-400">
								<div>
									<div class="">{prediction.rfifth}</div>
								</div>
							</div>
						</td>
					</tr>
				{/if}
				<!-- row 1 -->
				<tr>
					<td>
						<div class="flex items-center">
							<div>
								<div class="">{prediction.username}</div>
								<div class="text-sm opacity-50">{prediction.points_total}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex items-center">
							<div>
								{#if !raceStarted(prediction.date_time) && data.profile.username !== prediction.username}
									<div>***</div>
								{:else}
									<div class="">{prediction.pfirst}</div>
								{/if}
								<div class="text-sm opacity-50">{prediction.points_first}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex items-center">
							<div>
								{#if !raceStarted(prediction.date_time) && data.profile.username !== prediction.username}
									<div>***</div>
								{:else}
									<div class="">{prediction.psecond}</div>
								{/if}
								<div class="text-sm opacity-50">{prediction.points_second}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex items-center">
							<div>
								{#if !raceStarted(prediction.date_time) && data.profile.username !== prediction.username}
									<div>***</div>
								{:else}
									<div class="">{prediction.pthird}</div>
								{/if}
								<div class="text-sm opacity-50">{prediction.points_third}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex items-center">
							<div>
								{#if !raceStarted(prediction.date_time) && data.profile.username !== prediction.username}
									<div>***</div>
								{:else}
									<div class="">{prediction.pfourth}</div>
								{/if}
								<div class="text-sm opacity-50">{prediction.points_fourth}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex items-center">
							<div>
								{#if !raceStarted(prediction.date_time) && data.profile.username !== prediction.username}
									<div>***</div>
								{:else}
									<div class="">{prediction.pfifth}</div>
								{/if}
								<div class="text-sm opacity-50">{prediction.points_fifth}</div>
							</div>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
