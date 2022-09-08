<script>
  export let title = '';
  export let removeLabels = false;
  export let imageSrc;
  export let price = '';
  export let href = '';
  export let priority = 'lazy';
  let hover = false;
</script>

<div
  on:mouseenter={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
  class="h-full w-full overflow-hidden rounded-lg"
>
  <a data-test="grid-tile" href={href} sveltekit:prefetch class="cursor-default	relative flex items-center justify-center">
    <img
      alt={title}
      class={` object-cover transition duration-300 ease-in-out ${
        hover ? 'scale-110' : ''
      }`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
    {#if !removeLabels}
      <div class="absolute top-0 left-0">
        <div class="p-3 mb-4 text-2xl font-medium text-svelteOrange backdrop-blur bg-light/50 rounded-br">
          {title}
        </div>
        <div class="w-fit p-3 text-sm bg-light/60 rounded-r shadow-xl padding text-dark">
          ${price}
        </div>
      </div>
    {/if}
    </a>
</div>