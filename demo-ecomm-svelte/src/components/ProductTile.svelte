<script>
  import { sendEvents } from '../utils/tb.js';
  const demoButtons = [{ name: 'sale', icon: '💳' }];
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  export let ranking;
  export let product;
  export let priority = 'lazy';
</script>

<div data-test="grid-tile" class="flex-[0_0_336px] flex flex-col group overflow-clip relative">
  <div class="absolute left-0 right-0 z-10 flex items-center justify-between p-3 backdrop-blur-lg">
    <div class="flex items-center">
      {#each demoButtons as demoButton}
        <button
          class="w-8 h-8 mr-1 text-sm border-2 rounded-full shadow-xl bg-light/80 border-light/40 hover:animate-pulse"
          on:click={() =>
            sendEvents(
              [{ product: product.id, store: 'ecomm', amount: -1 }],
              'stock_availability',
              tbAppendToken
            )}
        >
          {demoButton.icon}
        </button>
      {/each}
    </div>

    <p class="m-0 text-sm font-medium text-svelteOrange">
      {product.rank_status == null ? '' : product.rank_status}
    </p>

    <p class="m-0 text-sm font-medium text-svelteOrange">
      {product.stock_status == 1
        ? 'Only ' + product.stock + ' left!'
        : product.stock_status == 2
        ? 'Out of stock!'
        : 'In stock'}
    </p>
  </div>

  <img
    alt={product.name}
    class={`object-cover transition-all duration-300 ease-in-out group-hover:scale-110 w-[336px] h-[336px] ${
      product.stock_status === 2 ? 'grey-out' : ''
    }`}
    fetchpriority={priority === 'eager' ? 'high' : 'low'}
    decoding="async"
    loading={priority}
    src={product.photo}
  />

  <div
    class="absolute bottom-0 left-0 right-0 flex items-center justify-between py-2 bg-black/70 backdrop-blur-lg"
  >
    <p class="my-0 font-semibold text-white uppercase truncate whitespace-nowrap">{product.name}</p>

    <p class="my-0 text-sm font-medium text-white">
      ${product.price ?? 100}
    </p>
  </div>
</div>