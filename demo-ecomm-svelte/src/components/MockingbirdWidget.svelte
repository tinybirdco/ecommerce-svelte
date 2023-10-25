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
          values: [
            'ecomm'
          ]
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

  const onGenerateClick = async () => {
    if (worker) {
      stopWorker(worker);
      worker = null;
    } else {
      const endpoint =
        host === 'api.tinybird.co'
          ? 'eu_gcp'
          : host === 'us-east.api.tinybird.co'
          ? 'us_gcp'
          : host;

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
    }
  };
</script>

<div class="flex items-center gap-0.5 mr-4">
  <p
    class="flex items-center h-[42px] px-4 py-2 m-0 text-sm font-bold border rounded-tl rounded-bl border-svelteOrange"
  >
    Generate data
  </p>

  <button
    class="flex items-center justify-center px-4 py-2 border rounded-tr rounded-br border-svelteOrange"
    on:click={onGenerateClick}
  >
    {worker ? '⏸️' : '▶️'}
  </button>
</div>
