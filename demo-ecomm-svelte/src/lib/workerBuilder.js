/**
 * Creates a worker for data generation
 * @param {Object} config - Configuration object
 * @param {Object} config.schema - Schema (not used in simple worker)
 * @param {string} config.endpoint - Tinybird endpoint
 * @param {string} config.token - Tinybird token
 * @param {string} config.datasource - Datasource name
 * @param {number} config.eps - Events per second
 * @param {number} config.limit - Event limit
 * @param {(message: MessageEvent) => void} onMessage - Message handler
 * @param {(e: ErrorEvent) => void} onError - Error handler
 */
export function createWorker(config, onMessage, onError) {
  if (!window.Worker) return undefined;

  // Use optimized simple worker for high throughput
  const worker = new Worker(new URL('./simpleWorker.js', import.meta.url), {
    type: 'module'
  });

  if (onMessage) worker.onmessage = onMessage;
  if (onError) worker.onerror = onError;

  // Pass the full config including EPS to the worker
  worker.postMessage({
    init: config.schema,
    config: {
      ...config,
      eps: config.eps || 500 // Default to 500 EPS if not specified
    }
  });

  return worker;
}

export function startWorker(worker) {
  worker.postMessage({});
}

export function stopWorker(worker) {
  if (worker) {
    worker.postMessage({ stop: true });
    // Give the worker more time to stop gracefully and send confirmation
    setTimeout(() => {
      worker.terminate();
    }, 500);
  }
}
