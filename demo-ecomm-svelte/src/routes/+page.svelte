<script>
	import Grid from '$lib/Grid.svelte';
	import { onMount } from 'svelte';
	let rankingValues = ['sales', 'carts', 'views'];
	let categoriesValues = ['all', 'short sleeve', 'long sleeve'];
	let ranking = rankingValues[0];
	let category = categoriesValues[0];

	const token = import.meta.env.VITE_TB_READ_TOKEN;
	const host = import.meta.env.VITE_TB_HOST;
	$: url = `https://${host}/v0/pipes/ranking.json?token=${token}&category=${category}&ranking=${ranking}`;

	let products = [];

	async function getSortedProds() {
		const res = await fetch(url);
		const json = await res.json();
		products = [...json.data];
	}

	$: fetch(url)
		.then((response) => response.json())
		.then((data) => (products = data.data));

</script>



<main>
	<h1 class="text-4xl leading-none text-slate-900 font-black m-4">Tinybird Store</h1>
	<div class="flex flex-row">
		<nav class="py-8 pl-6 pr-2">
			<h1 class="text-lg font-semibold">Categories</h1>
			{#each categoriesValues as categoriesValue}
				<label class="mt-2 text-sm text-gray-300 block ">
					<input
						type="radio"
						bind:group={category}
						name="category"
						value={categoriesValue}
						id={categoriesValue}
						class="hidden peer"
					/>
					<div class="peer-checked:text-md peer-checked:text-tbTextGrey">
						{categoriesValue[0].toUpperCase() + categoriesValue.substring(1)}
					</div>
				</label>
			{/each}
			<br />
			<h1 class="text-lg font-semibold mt-4">Ranking</h1>
			{#each rankingValues as rankingValue}
				<label class="mt-2 text-sm text-gray-300 block">
					<input
						type="radio"
						bind:group={ranking}
						name="ranking"
						value={rankingValue}
						id={rankingValue}
						class="hidden peer"
					/>
					<div class="peer-checked:text-md peer-checked:text-tbTextGrey">
						{rankingValue[0].toUpperCase() + rankingValue.substring(1)}
					</div>
				</label>
			{/each}
			<button class="text-md mt-12" on:click={getSortedProds}>Refresh</button>
		</nav>
		<section>
			<div class="max-w-screen-xl ml-4">
				<Grid {products} {ranking} />
			</div>
		</section>
	</div>
	<section>
		<div
			class="flex flex-col border border-black bg-dark py-20 px-8 text-white lg:flex-row lg:items-center"
		>
			<div
				class="mb-4 mr-8 flex-none text-left text-3xl font-black md:text-4xl lg:mb-0 lg:w-1/3 lg:text-right lg:text-6xl"
			>
				Tinybird Store.
			</div>
			<div>
				<div class="lg:text-2xl">
					Demo app to showcase the value of realtime personalization with a simple use case.<br>
					<a href="/about" class="mt-4 font-bold text-svelteOrange hover:text-svelteDark lg:text-2xl">
						Check how it works here.
					</a>
				</div>
				<div class="lg:text-2xl">
					You can use Tinybird Data Generator to simulate higher traffic.
					<a href="/generate-data" class="mt-4 font-bold text-svelteOrange hover:text-svelteDark lg:text-2xl">
						Guide here.
					</a>
				</div>
			</div>
		</div>
	</section>
</main>
