<script>
  import GridTile from '$lib/GridTile.svelte';
  import { sendEvents } from '../utils/tb.js';
  const demoButtons = [
    {name: 'view', icon: '👁️' },
    {name: 'cart', icon: '🛒' },
    {name: 'sale', icon: '💳' },
  ]
  export let ranking;
  export let products;
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
</script>

<div class="flex flex-row flex-wrap max-w-screen-xl my-0 mx-auto px-1 py-2 gap-4 mb-3">
  {#each products as product }
    <div class="w-full max-h-[480px] bg-dark max-w-sm rounded-lg relative shadow-lg">
      <GridTile
        priority="eager"
        title={product.name}
        price={product.price || 100}
        imageSrc={product.photo}
      />
      <p class="absolute m-0 bottom-0 right-0 p-3 text-sm bg-light/60 rounded-tl padding">
        {product.total || 0} {ranking}
      </p>
      <div class="absolute bottom-0 left-0 p-3">
        {#each demoButtons as demoButton}
        <button class="mr-1 text-sm bg-light/80 border-2 border-light/40 shadow-xl w-8 h-8 rounded-full" on:click={()=>sendEvents([{'product': product.id, 'event': demoButton.name}], 'web_events', tbAppendToken )}> {demoButton.icon} </button>
        {/each}
      </div>
    </div>
  {/each}
  </div>
