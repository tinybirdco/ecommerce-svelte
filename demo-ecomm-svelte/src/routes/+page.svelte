<script>
  import MockingbirdWidget from '../components/MockingbirdWidget.svelte';
  import ProductTile from '../components/ProductTile.svelte';

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

  $: if (url) getSortedProds();
</script>

<main>
  <div class="flex items-center justify-between shadow">
    <h1 class="m-4 text-4xl font-black leading-none text-slate-900">Tinybird Store</h1>
    <div class="flex items-center gap-4">
      <button
        class="flex items-center h-10 px-4 py-2 m-0 text-sm font-bold border rounded border-svelteOrange"
        on:click={getSortedProds}>Refresh 🔄</button
      >
      <MockingbirdWidget />
    </div>
  </div>
  <div class="flex flex-row mt-4">
    <nav class="py-8 pl-6 pr-2">
      <h1 class="text-xl font-semibold">Categories</h1>
      {#each categoriesValues as categoriesValue}
        <label class="block mt-2 text-sm text-tbTextGrey">
          <input
            type="radio"
            bind:group={category}
            name="category"
            value={categoriesValue}
            id={categoriesValue}
            class="hidden peer"
          />
          <div
            class="cursor-pointer peer-checked:text-md peer-checked:font-semibold hover:underline"
          >
            {categoriesValue[0].toUpperCase() + categoriesValue.substring(1)}
          </div>
        </label>
      {/each}

      <h1 class="mt-6 text-xl font-semibold">Ranking</h1>
      {#each rankingValues as rankingValue}
        <label class="block mt-2 text-sm text-tbTextGrey">
          <input
            type="radio"
            bind:group={ranking}
            name="ranking"
            value={rankingValue}
            id={rankingValue}
            class="hidden peer"
          />
          <div
            class="cursor-pointer peer-checked:text-md peer-checked:font-semibold hover:underline"
          >
            {rankingValue[0].toUpperCase() + rankingValue.substring(1)}
          </div>
        </label>
      {/each}
    </nav>
    <section class="flex flex-row flex-wrap mx-auto ml-4 gap-y-8 gap-x-4">
      {#each products as product}
        <ProductTile priority="eager" {product} {ranking} />
      {/each}
    </section>
  </div>
  <section class="mt-10">
    <div
      class="flex flex-col px-8 py-20 text-white border border-black bg-dark lg:flex-row lg:items-center"
    >
      <div
        class="flex-none mb-4 mr-8 text-3xl font-black text-left md:text-4xl lg:mb-0 lg:w-1/3 lg:text-right lg:text-6xl"
      >
        Tinybird Store.
      </div>
      <div>
        <div class="lg:text-2xl">
          Demo app to showcase the value of realtime personalization with a simple use case.<br />
          <a
            href="/about"
            class="mt-4 font-bold no-underline text-svelteOrange hover:text-svelteDark lg:text-2xl"
          >
            Check how it works here.
          </a>
        </div>

        <div class="mt-2 lg:text-2xl">
          View the eCommerce Analytics
          <a
            href="https://ecommerce-svelte-tremor-dashboard.vercel.app/"
            class="mt-4 font-bold no-underline text-svelteOrange hover:text-svelteDark lg:text-2xl"
          >
            Dashboard here.
          </a>
        </div>
      </div>
    </div>
  </section>
</main>
