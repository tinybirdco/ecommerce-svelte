# Ecommerce-svelte demo

This repo contains an ecommerce demo tho show a very basic[^1] example of real time personalization using Tinybird to ingest data, transform it, and publish endpoints.

It is deliberatedly simple –just 9 products, no Materialized Views...– to be quickly showable in a demo.

## Create the Tinybird workspace

If you are planning to use the current workspace, ask internally for the tokens and jump directly to the next step.

Otherwise, `cd data-project` and follow the [README](/data-project/README.md) of that folder.

## The website

`cd demo-ecomm-svelte` and follow the [README](/demo-ecomm-svelte/README.md).

## Enhancements

Check the /todo page to check planned developments.

### Using the Tinybird Web Analytics Starter Kit

Follow the [Starter Kit README](https://github.com/tinybirdco/web-analytics-starter-kit#readme) and add the flock.js scrtipt in `demo-ecomm-svelte/src/routes/+layout.svelte` inside the `<svelte:head>` tag:

```html
<svelte:head>
	<title>Home - SvelteKit Commerce</title>
	<script src="https://unpkg.com/@tinybirdco/flock.js" data-token="YOUR_TRACKER_TOKEN"></script>
</svelte:head>
```

And you can check your dashboard right away: [https://analytics.tinybird.co/](https://analytics.tinybird.co/) adding the `dashboard` token from your workspace.

Note: we already included it using the `VITE_WEB_TRACKER` and `VITE_WEB_TRACKER` environment variables.

[^1]: Very basic in the sense of not taking to account the user journey, just the number of visits, sales, and people who added to cart for each product. It definetly can be enhanced.
