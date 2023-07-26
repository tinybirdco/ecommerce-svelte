<script>
  import { sendEvents } from '../utils/tb.js';
  const demoButtons = [
    { name: 'view', icon: '👁️' },
    { name: 'cart', icon: '🛒' },
    { name: 'sale', icon: '💳' }
  ];
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  export let ranking;
  export let product;
  export let priority = 'lazy';
</script>

<div data-test="grid-tile" class="flex-[0_0_336px] flex flex-col group overflow-clip relative">
  <div class="absolute right-0 z-10 p-3">
    {#each demoButtons as demoButton}
      <button
        class="w-8 h-8 mr-1 text-sm border-2 rounded-full shadow-xl bg-light/80 border-light/40"
        on:click={() =>
          sendEvents(
            [{ product: product.id, event: demoButton.name }],
            'web_events',
            tbAppendToken
          )}
      >
        {demoButton.icon}
      </button>
    {/each}
  </div>

  <img
    alt={product.name}
    class="object-cover transition duration-300 ease-in-out group-hover:scale-110 w-[336px] h-[450px]"
    fetchpriority={priority === 'eager' ? 'high' : 'low'}
    decoding="async"
    loading={priority}
    src={product.photo}
  />

  <p class="mt-6 mb-2 font-semibold uppercase">{product.name}</p>

  <div class="flex items-center justify-between px-4">
    <p class="m-0 text-xs font-medium">
      ${product.price ?? 100}
    </p>

    <p class="m-0 text-sm">
      {product.total || 0}
      {ranking}
    </p>
  </div>
</div>
