<script>
	import '../app.css';
  const tbTrackerToken = import.meta.env.VITE_WEB_TRACKER_TOKEN;
  const tbTrackerHost = import.meta.env.VITE_WEB_TRACKER_HOST;
</script>

<svelte:head>
	<title>Tinybird - SvelteKit Commerce</title>
	<script src="https://unpkg.com/@tinybirdco/flock.js" data-token={tbTrackerToken} data-host={`https://${tbTrackerHost}`}></script>
</svelte:head>

<div class="min-h-screen">
	<slot />
</div>

