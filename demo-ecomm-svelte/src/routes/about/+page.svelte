<script>
	const tbDashboardToken = import.meta.env.VITE_WEB_DASHBOARD_TOKEN;
	const tbTrackerHost = import.meta.env.VITE_WEB_TRACKER_HOST;
</script>

<h1>Ecommerce Demo App used for Tinybird demos</h1>

<p>
  Some of our customers use Tinybrd to personalize the user experence in real time, being <a class="underline" href="https://medium.com/hotel-tech-stories/the-hotels-network-goes-real-time-adb748b6b124" target="_blank">THN</a>
	 and <a class="underline" href="https://www.tinybird.co/case-studies/daily-dev-relies-on-tinybird-to-keep-devs-up-to-date-on-the-best-developer-news" target="_blank">Daily.dev</a> two great examples of this.
	</p>
<p>
  Here we have an app that does realtime UX personalization in its most basic format, without taking the visitor id into account, just based on product popularity.<br>
	Basically, we ingest an event with the product id and timestamp every time a product is viewed, clicked, or sold. We build a pipe in Tinybird that exposes an API endpoint on top of that data to reorder the products from the most viewed/sold/added-to-cart to the least one based, choosing the datasource to look up with the ranking parameter.<br>
	For a real use case it should be enhanced and add stock to the product score, downgrading the products that have less units to be shown, and show the ones that correlate more with the known visits and purchases of the visitor.<br>
	Note this is a demo. The calls should probably be in an Svelte endpoint, the environment variables are publicly shown...<br>
</p>

<h2>Web Analytics Tracker</h2>
<p>
	Following the <a class="underline" href="https://github.com/tinybirdco/web-analytics-starter-kit#readme" target="_blank">Starter Kit README</a> you can have a web tracker with Tinybird.
	Check the dashboard for this demo app <a class="underline" href="https://analytics.tinybird.co/?host={`https://${tbTrackerHost}`}&token={tbDashboardToken}" target="_blank">here</a>.
</p>

<h2>Credits</h2>

<p>Photo credits: unsplash</p>

<p>
  Built with <a class="underline" href="https://kit.svelte.dev/" target="_blank">SvelteKit</a>, realtime personalized thanks to
	<a class="underline" href="https://www.tinybird.co/" target="_blank">Tinybird</a>
</p>
<p>
  FreeCodeCamp's photo gallery <a class="underline" href="https://www.freecodecamp.org/learn/2022/responsive-web-design/learn-css-flexbox-by-building-a-photo-gallery/step-1" target="_blank">example</a>.
</p>
<p>
  For a nicer implementation of an ecommerce using SvelteKit, check <a class="underline"
  href="https://vercel.com/docs/beginner-sveltekit" target="_blank">Vercel's SvelteKit course</a
	>
	and the final <a class="underline" href="https://vercel.com/templates/svelte/sveltekit-commerce" target="_blank">template</a>
</p>

<h3>Planned demo enhancements can be checked in <a class="underline" href='/todo'>/todo</a></h3>