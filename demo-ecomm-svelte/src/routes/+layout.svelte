<script>
  import "../app.css";
</script>

<!-- <div class="flex">
  <nav class="col-span-2 hidden w-1/6 flex-none py-8 pl-6 lg:block">
    <h1 class="text-lg font-semibold">Categories</h1>
    <ul>
      <li class="mt-2 text-sm text-gray-300">
        <a
          data-testid="category-link"
          aria-selected="true"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/">All</a
        >
      </li>
      <li class="mt-2 text-sm text-gray-300">
        <a
          data-testid="category-link"
          aria-selected="true"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/featured">Short Sleeves</a
        >
      </li>
      <li class="mt-2 text-sm text-gray-300">
        <a
          data-testid="category-link"
          aria-selected="true"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/clothes">Long Sleeves</a
        >
      </li>
    </ul>
    <h1 class="text-lg font-semibold mt-4">Ranking</h1>

<label class="mt-2 text-sm text-gray-300 block">
	<input type=radio bind:group={ranking} name="ranking" value={'sales'} >
	Sales
</label>

<label class="mt-2 text-sm text-gray-300 block">
	<input type=radio bind:group={ranking} name="ranking" value={'carts'} >
	Carts
</label>

<label class="mt-2 text-sm text-gray-300 block whitespace-nowrap hover:underline focus:underline active:bg-violet-700">
	<input type=radio bind:group={ranking} name="ranking" value={'views'}>
	Views
</label>

<p>selected values is {ranking}</p>

  </nav> -->
  <div class="min-h-screen">
    <slot/>
  </div>
<!-- </div> -->
