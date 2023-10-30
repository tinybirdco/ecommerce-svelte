<script>
  import { sendEvents } from '../utils/tb.js';
  const demoButtons = [{ name: 'sale', icon: '💳' }];
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  export let ranking;
  export let product;
  export let priority = 'lazy';
</script>

<li data-test="grid-tile" class="group overflow-hidden flex flex-col md:col-span-1">
  <div class="relative rounded-lg overflow-hidden aspect-[3/4]">
    <img
      alt={product.name}
      class={`duration-300 ease-in-out group-hover:scale-105 md:group-hover:rounded-xl md:transition-all md:duration-500 block absolute h-full w-full object-cover bg-white ${
        product.stock_status === 2 ? 'grey-out' : ''
      }`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={product.photo}
    />
    <div class="absolute bottom-2 right-2 flex items-center">
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
  </div>
  <div class="mt-4 md:min-h-[72px] lg:min-h-0">
    <h3 class="font-semibold text-secondary">{product.name}</h3>
    <p class="text-gray-500">
      <span>${product.price ?? 100}</span>
    </p>
  </div>
</li>
