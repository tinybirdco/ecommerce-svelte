<script>
  import { createTooltip } from '@melt-ui/svelte';
  import { createWorker, startWorker, stopWorker } from '../lib/workerBuilder';
  import { Pause, Play } from 'lucide-svelte';

  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  const host = import.meta.env.VITE_TB_HOST;
  let worker = null;
  let errorMessage = '';
  let apiCalls = [];
  let totalEventsSent = 0;

  const pauseData = async () => {
    if (worker) {
      stopWorker(worker);
    }
  };

  const generateData = async () => {
    // Debug environment variables
    console.log('Environment variables:', {
      host,
      hasToken: !!tbAppendToken,
      tokenLength: tbAppendToken?.length
    });

    if (!tbAppendToken) {
      errorMessage = 'Missing VITE_TB_APPEND_TOKEN environment variable';
      return;
    }

    if (!host) {
      errorMessage = 'Missing VITE_TB_HOST environment variable';
      return;
    }

    const endpoint =
      host === 'api.tinybird.co' ? 'gcp_europe_west3' : host === 'us-east.api.tinybird.co' ? 'gcp_us_east4' : host;

    worker = createWorker({
      schema: {}, // Empty schema since we're not using Mockingbird
      endpoint,
      token: tbAppendToken,
      datasource: 'ecomm_events',
      eps: 500,
      limit: 100000
    }, 
    (message) => {
      // Handle API call messages
      if (message.data && message.data.type === 'apiCall') {
        const call = {
          timestamp: new Date().toISOString(),
          url: message.data.url,
          eventCount: message.data.events.length,
          success: message.data.success,
          response: message.data.response,
          error: message.data.error
        };
        
        apiCalls = [call, ...apiCalls.slice(0, 9)]; // Keep last 10 calls
        
        if (message.data.success) {
          totalEventsSent += message.data.events.length;
          console.log(`✅ API Call Success: ${message.data.events.length} events sent`);
        } else {
          console.error(`❌ API Call Failed: ${message.data.error}`);
        }
        
        errorMessage = '';
      }
      // Handle successful data generation
      else if (message.data && typeof message.data === 'number') {
        console.log(`Generated ${message.data} events`);
        errorMessage = '';
      } 
      // Handle stop confirmation from worker
      else if (message.data && message.data.type === 'stopped') {
        worker = null;
      }
      // Handle error messages from worker
      else if (message.data && message.data.error) {
        console.error('Worker error:', message.data);
        errorMessage = message.data.error;
        if (message.data.details) {
          errorMessage += ` - ${message.data.details}`;
        }
        worker = null;
      }
    },
    (error) => {
      // Handle worker errors
      console.error('Worker error:', error);
      errorMessage = `Worker error: ${error.message || 'Unknown error'}`;
      worker = null;
    });

    if (!worker) return;

    startWorker(worker);
  };
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
</script>

{#if worker}
  <button
    class="relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
    on:click={pauseData}
    use:melt={$trigger}
  >
    <Pause class="h-4 w-4" color="#fff"/>
  </button>
{:else}
  <button
    class="relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
    on:click={generateData}
    use:melt={$trigger}
  >
    <Play class="h-4 w-4" color="#fff"/>
  </button>
{/if}
{#if $open}
  <div use:melt={$content} class="z-50 rounded-lg bg-secondary shadow">
    <p class="px-4 py-1 text-white text-sm">
      {worker ? 'Pause data' : 'Generate data'}
    </p>
  </div>
{/if}

{#if errorMessage}
  <div class="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
    {errorMessage}
  </div>
{/if}


