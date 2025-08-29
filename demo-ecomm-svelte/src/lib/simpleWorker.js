// Optimized simple worker that simulates data generation and sends to Tinybird
// This version is designed for high throughput similar to Mockingbird

let isGenerating = false;
let intervalId = null;
let config = null;
let concurrentRequests = 0;
const MAX_CONCURRENT_REQUESTS = 10; // Limit concurrent API calls
const BATCH_SIZE = 50; // Send events in larger batches
let TARGET_EPS = 500; // Target events per second (configurable)

onmessage = async function (e) {
  try {
    if ('init' in e.data) {
      if ('config' in e.data) {
        config = e.data.config;
        
        // Extract target EPS from config if available
        if (config.eps) {
          TARGET_EPS = config.eps;
        }
      } else {
        console.error('No config supplied to worker');
        self.postMessage({ error: 'No config supplied to worker' });
      }
    } else if ('stop' in e.data) {
      // Handle stop command
      stopGenerating();
    } else {
      if (!isGenerating) {
        startGenerating();
      }
    }
  } catch (error) {
    console.error('Worker error:', error);
    self.postMessage({ 
      error: error.message,
      stack: error.stack,
      name: error.name
    });
  }
};

async function startGenerating() {
  if (isGenerating) return;
  
  isGenerating = true;
  
  // Calculate interval based on target EPS
  const eventsPerBatch = BATCH_SIZE;
  const batchesPerSecond = TARGET_EPS / eventsPerBatch;
  const intervalMs = Math.max(100, 1000 / batchesPerSecond); // Minimum 100ms interval
  
  // Generate and send data at high frequency
  intervalId = setInterval(async () => {
    if (!isGenerating) return;
    
    // Don't start new requests if we're at the concurrent limit
    if (concurrentRequests >= MAX_CONCURRENT_REQUESTS) {
      return;
    }
    
    try {
      concurrentRequests++;
      
      // Generate a batch of events
      const events = generateEventBatch(eventsPerBatch);
      
      // Send events to Tinybird (don't await - let it run concurrently)
      sendEventsToTinybird(events).then(result => {
        concurrentRequests--;
        
        if (result.success) {
          self.postMessage(events.length);
        } else {
          console.error('Failed to send events to Tinybird:', result.error);
          self.postMessage({ error: `Failed to send events: ${result.error}` });
        }
      }).catch(error => {
        concurrentRequests--;
        console.error('Error in API call:', error);
        self.postMessage({ error: `API call error: ${error.message}` });
      });
      
    } catch (error) {
      concurrentRequests--;
      console.error('Error in data generation cycle:', error);
      self.postMessage({ error: `Generation error: ${error.message}` });
    }
  }, intervalMs);
}

function generateEventBatch(count) {
  const events = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const event = {
      timestamp: new Date(now.getTime() + i * 10).toISOString(), // Spread timestamps slightly
      product: getRandomProduct(),
      event: getRandomEvent()
    };
    events.push(event);
  }
  
  return events;
}

function stopGenerating() {
  isGenerating = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  
  // Notify the main thread that we've stopped
  self.postMessage({ type: 'stopped' });
}

function getRandomProduct() {
  const products = [
    'sZzx0cUDX98',
    '5d0cgAl5BTk',
    'YY4YaHKh2jQ',
    'p8Drpg_duLw',
    'xFmXLq_KJxg',
    'fSdBxY0NxVI',
    '6cHumpSxTvs',
    'Zu7A1GCSjZE',
    'Fg15LdqpWrs'
  ];
  return products[Math.floor(Math.random() * products.length)];
}

function getRandomEvent() {
  const events = ['view', 'cart', 'sale'];
  const weights = [60, 33, 24];
  
  // Simple weighted random selection
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < events.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return events[i];
    }
  }
  
  return events[0]; // fallback
}

async function sendEventsToTinybird(events) {
  try {
    if (!config || !config.token || !config.datasource) {
      return { success: false, error: 'Missing configuration (token or datasource)' };
    }

    // Format timestamp for Tinybird
    const date = new Date();
    events.forEach(ev => {
      ev.timestamp = date.toISOString().slice(0, 19);
    });

    // Determine the correct host URL
    let hostUrl;
    if (config.endpoint === 'gcp_europe_west3' || config.endpoint === 'api.tinybird.co') {
      hostUrl = 'https://api.tinybird.co';
    } else if (config.endpoint === 'gcp_us_east4' || config.endpoint === 'us-east.api.tinybird.co') {
      hostUrl = 'https://us-east.api.tinybird.co';
    } else {
      // Use the endpoint directly if it's a full URL
      hostUrl = config.endpoint.startsWith('http') ? config.endpoint : `https://${config.endpoint}`;
    }

    const headers = {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json'
    };

    const url = `${hostUrl}/v0/events?name=${config.datasource}`;
    
    console.log('Sending events to:', url);
    console.log('Events:', events);

    const response = await fetch(url, {
      method: 'POST',
      body: events.map(JSON.stringify).join('\n'),
      headers: headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tinybird API error:', response.status, errorText);
      
      // Log the failed call
      self.postMessage({ 
        type: 'apiCall', 
        url, 
        events, 
        error: `HTTP ${response.status}: ${errorText}`,
        success: false
      });
      
      return { 
        success: false, 
        error: `HTTP ${response.status}: ${errorText}` 
      };
    }

    const content = await response.json();
    console.log('Tinybird response:', content);
    
    // Log the successful call
    self.postMessage({ 
      type: 'apiCall', 
      url, 
      events, 
      response: content,
      success: true
    });
    
    return { success: true, data: content };
  } catch (error) {
    console.error('Error sending events to Tinybird:', error);
    
    // Log the failed call
    self.postMessage({ 
      type: 'apiCall', 
      url: 'unknown', 
      events, 
      error: error.message,
      success: false
    });
    
    return { success: false, error: error.message };
  }
}

// Handle worker termination
self.addEventListener('beforeunload', () => {
  stopGenerating();
}); 