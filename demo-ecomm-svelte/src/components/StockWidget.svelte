<script>
  import { createTooltip } from '@melt-ui/svelte';
  import { Truck } from 'lucide-svelte';

  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  const host = import.meta.env.VITE_TB_HOST;

  const {
    elements: { trigger, content },
    states: { open }
  } = createTooltip({
    positioning: {
      placement: 'bottom'
    },
    openDelay: 0,
    closeDelay: 0,
    closeOnPointerDown: false,
    forceVisible: true
  });

  const resetStock = async () => {
    try {
      console.log('Starting truncation...');
      await truncateLatestAvailability(); // Wait for truncation to complete
      console.log('Truncation complete, now appending stock...');
      appendStock(); // Call appendStock only if truncation is successful
    } catch (error) {
      console.error('Failed to reset stock:', error); // Log any errors
    }
  };

  const truncateLatestAvailability = async () => {
    try {
      const response = await fetch(`https://${host}/v0/datasources/mat_stock_latest/truncate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tbAppendToken}` }
      });

      // Check if the response is okay
      if (!response.ok) {
        const errorText = await response.text(); // Get the error text if available
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Handle 205 Reset Content response
      if (response.status === 205) {
        console.log('Truncation successful, no content to return.');
        return; // No content to return, just exit the function
      }

      // Attempt to parse the response as JSON for other status codes
      const res = await response.json();
      console.log(res);
      return res; // Ensure this returns a value
    } catch (error) {
      console.error('Error truncating availability:', error);
      throw error; // Rethrow the error to be caught in resetStock
    }
  };

  const appendStock = () => {
    const data = [
      {
        timestamp: new Date().toISOString(),
        product: '5d0cgAl5BTk',
        store: 'warehouse_1',
        amount: 10000
      },
      {
        timestamp: new Date().toISOString(),
        product: 'YY4YaHKh2jQ',
        store: 'warehouse_1',
        amount: 10000
      },
      {
        timestamp: new Date().toISOString(),
        product: 'p8Drpg_duLw',
        store: 'warehouse_1',
        amount: 10000
      },
      {
        timestamp: new Date().toISOString(),
        product: 'sZzx0cUDX98',
        store: 'warehouse_1',
        amount: 50000
      },
      {
        timestamp: new Date().toISOString(),
        product: 'xFmXLq_KJxg',
        store: 'warehouse_1',
        amount: 1000
      },
      {
        timestamp: new Date().toISOString(),
        product: '6cHumpSxTvs',
        store: 'warehouse_1',
        amount: 100
      },
      {
        timestamp: new Date().toISOString(),
        product: 'Fg15LdqpWrs',
        store: 'warehouse_1',
        amount: 85
      },
      {
        timestamp: new Date().toISOString(),
        product: 'Zu7A1GCSjZE',
        store: 'warehouse_1',
        amount: 0
      },
      {
        timestamp: new Date().toISOString(),
        product: 'fSdBxY0NxVI',
        store: 'warehouse_1',
        amount: 0
      }
    ];
    const ndjson = data.map((row) => JSON.stringify(row)).join('\n');
    fetch(`https://${host}/v0/events?name=warehouse_stock`, {
      method: 'POST',
      body: ndjson,
      headers: { Authorization: `Bearer ${tbAppendToken}` }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error appending stock:', error)); // Handle errors in appending
  };

</script>

<button
  class="relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
  on:click={resetStock}
  use:melt={$trigger}
>
  <Truck class="h-4 w-4" color="#fff" />
</button>

{#if $open}
  <div use:melt={$content} class="z-50 rounded-lg bg-secondary shadow">
    <p class="px-4 py-1 text-white text-sm">Reset stock</p>
  </div>
{/if}
