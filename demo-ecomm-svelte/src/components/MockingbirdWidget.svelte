<script>
  import { createWorker, startWorker, stopWorker } from '../lib/workerBuilder';

  /** @type {import('@tinybirdco/mockingbird').Schema} */
  const schema = {
    timestamp: {
      type: 'mockingbird.timestampNow'
    },
    product: {
      type: 'mockingbird.pick',
      params: [
        {
          values: [
            'sZzx0cUDX98',
            '5d0cgAl5BTk',
            'YY4YaHKh2jQ',
            'p8Drpg_duLw',
            'xFmXLq_KJxg',
            'fSdBxY0NxVI',
            '6cHumpSxTvs',
            'Zu7A1GCSjZE',
            'Fg15LdqpWrs'
          ]
        }
      ]
    },
    store: {
      type: 'mockingbird.pick',
      params: [
        {
          values: ['ecomm']
        }
      ]
    },
    amount: {
      type: 'number.int',
      params: [
        {
          min: '-1',
          max: '-1'
        }
      ]
    }
  };
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  const host = import.meta.env.VITE_TB_HOST;
  let worker = null;

  const pauseData = async () => {
    if (worker) {
      stopWorker(worker);
      worker = null;
    }
  };

  const generateData = async () => {
    const endpoint =
      host === 'api.tinybird.co' ? 'eu_gcp' : host === 'us-east.api.tinybird.co' ? 'us_gcp' : host;

    worker = createWorker({
      schema,
      endpoint,
      token: tbAppendToken,
      datasource: 'stock_availability',
      eps: 500,
      limit: 100000
    });

    if (!worker) return;

    startWorker(worker);
  };
</script>

{#if worker}
  <button
    class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
    on:click={pauseData}
  >
    <svg
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
      />
    </svg>
  </button>
{:else}
  <button
    class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
    on:click={generateData}
  >
    <svg
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
      />
    </svg>
  </button>
{/if}
