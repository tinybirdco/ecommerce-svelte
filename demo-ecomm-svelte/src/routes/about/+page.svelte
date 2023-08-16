<script>
  const tbDashboardToken = import.meta.env.VITE_WEB_DASHBOARD_TOKEN;
  const tbTrackerHost = import.meta.env.VITE_WEB_TRACKER_HOST;
  const token = import.meta.env.VITE_TB_READ_TOKEN;
</script>

<div class="m-4">
  <h1>Ecommerce Demo App used for Tinybird demos</h1>

  <h2>UX Personalization</h2>
  <p>
    Some of our customers use Tinybird to personalize the user experence in real time, being <a
      class="underline"
      href="https://medium.com/hotel-tech-stories/the-hotels-network-goes-real-time-adb748b6b124"
      target="_blank">THN</a
    >
    and
    <a
      class="underline"
      href="https://www.tinybird.co/case-studies/daily-dev-relies-on-tinybird-to-keep-devs-up-to-date-on-the-best-developer-news"
      target="_blank">Daily.dev</a
    > two great examples of this.
  </p>
  <p>
    Here we have an app that does realtime UX personalization in its most basic format, without
    taking the visitor id into account, just based on product popularity.<br />
    Basically, we ingest an event with the product id and timestamp every time a product is viewed, clicked,
    or sold. We build a pipe in Tinybird that exposes an API endpoint on top of that data to reorder
    the products from the most viewed/sold/added-to-cart to the least one based, choosing the datasource
    to look up with the ranking parameter.
  </p>
  <div class="flex justify-center max-w-screen-md">
    <img
      alt="tinybird data flow schema: user activity sends data to a datasource called web_events. The datasource feeds an endpoint called ranking"
      class="h-72"
      src="drawings/basic-ranking.png"
    />
  </div>
  <p>
    Check the data-project <a
      href="https://github.com/tinybirdco/ecommerce-svelte/tree/main/data-project"
      target="_blank">data-project</a
    > for more details.
  </p>

  <p>
    For a real use case it should be enhanced and add stock to the product score, downgrading the
    products that have less units to be shown, and show the ones that correlate more with the known
    visits and purchases of the visitor.<br />
    The plan is to have iterations of the project, probably creating different and more complex data-project
    folders to showcase MVs, ingestion from Kafka, CSV, replaces...
  </p>
  <p>
    Regarding the App, note this is a demo. The calls to api.tinybird.co should probably be in an
    Svelte endpoint, the environment variables are publicly shown... However, all feedback is more
    than welcome.<br />
  </p>

  <h2>eCommerce Analytics Dashboard</h2>
  <p>
    Another common Tinybird use case is Operational Intelligence. The same data being used to rank
    products in the store is valuable information for the business. Capturing this data and
    presenting it to the organization in a <a
      class="underline"
      href="https://pocs.tinybird.co/commerce-ufa?token={token}"
      target="_blank">real-time dashboard</a
    > enables data-driven decisions.
  </p>
  <div class="flex justify-center max-w-screen-md">
    <img
      alt="tinybird data flow improved schema: same diagram as before but with materialized views that show aggregations and several endpoints from there"
      class="h-72"
      src="drawings/improved-flowchart.png"
    />
  </div>
  <h2>Web Analytics Tracker</h2>
  <p>
    Following the <a
      class="underline"
      href="https://github.com/tinybirdco/web-analytics-starter-kit#readme"
      target="_blank">Starter Kit README</a
    >
    you can have a web tracker with Tinybird. Check the dashboard for this demo app
    <a
      class="underline"
      href="https://analytics.tinybird.co/?host={`https://${tbTrackerHost}`}&token={tbDashboardToken}"
      target="_blank">here</a
    >.
  </p>

  <h2>Credits</h2>

  <p>Photo credits: unsplash</p>

  <p>
    Built with <a class="underline" href="https://kit.svelte.dev/" target="_blank">SvelteKit</a>,
    realtime personalized thanks to
    <a class="underline" href="https://www.tinybird.co/" target="_blank">Tinybird</a>
  </p>
  <p>
    FreeCodeCamp's photo gallery <a
      class="underline"
      href="https://www.freecodecamp.org/learn/2022/responsive-web-design/learn-css-flexbox-by-building-a-photo-gallery/step-1"
      target="_blank">example</a
    >.
  </p>
  <p>
    For a nicer implementation of an ecommerce using SvelteKit, check <a
      class="underline"
      href="https://vercel.com/docs/beginner-sveltekit"
      target="_blank">Vercel's SvelteKit course</a
    >
    and the final
    <a
      class="underline"
      href="https://vercel.com/templates/svelte/sveltekit-commerce"
      target="_blank">template</a
    >
  </p>

  <h3>Planned demo enhancements can be checked in <a class="underline" href="/todo">/todo</a></h3>
</div>
