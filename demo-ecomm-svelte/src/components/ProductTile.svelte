<script>
  import { sendEvents } from '../utils/tb.js';
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  export let product;
  export let priority = 'lazy';

  import { createTooltip, melt } from '@melt-ui/svelte';
  import { fade } from 'svelte/transition';
  import { CreditCard } from 'lucide-svelte';

  const {
    elements: { trigger, content },
    states: { open }
  } = createTooltip({
    positioning: {
      placement: 'top'
    },
    openDelay: 0,
    closeDelay: 0,
    closeOnPointerDown: false,
    forceVisible: true
  });
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
      <button
        class="rounded-full bg-secondary p-1.5 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        use:melt={$trigger}
        aria-label="Buy"
        on:click={() =>
          sendEvents(
            [{ product: product.id, store: 'ecomm', amount: -1 }],
            'stock_availability',
            tbAppendToken
          )}
      >
        <CreditCard class="h-4 w-4" />
      </button>
      {#if $open}
        <div
          use:melt={$content}
          transition:fade={{ duration: 100 }}
          class="z-50 rounded-lg bg-secondary shadow"
        >
          <p class="px-4 py-1 text-white text-sm">Buy</p>
        </div>
      {/if}
    </div>
  </div>
  <div class="mt-4 md:min-h-[72px] lg:min-h-0">
    <h3 class="font-semibold text-secondary">{product.name}</h3>
    <p class="text-gray-500">
      <span>${product.price ?? 100}</span>
    </p>
  </div>
</li>
