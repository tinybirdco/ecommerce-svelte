<script>
  export let title = '';
  export let removeLabels = false;
  export let imageSrc;
  export let price = '';
  export let href = '';
  export let priority = 'lazy';
  //check images https://youtu.be/ydR_M0fw9Xc?t=2046
  /*

  .gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 10px;
  min-width: 300px;
}

  .gallery img {
  width: 100%;
  max-width: 350px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.gallery::after {
  content: "";
  width: 350px;
}
  */

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
  <a data-test="grid-tile" href={href} sveltekit:prefetch class="relative flex items-center justify-center">
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
        <div class="w-fit p-3 text-sm bg-light/60 rounded-r shadow-xl padding">
          ${price}
        </div>
      </div>
    {/if}
    </a>
</div>