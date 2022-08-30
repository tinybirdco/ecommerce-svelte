<script>
	const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
	const dgUrl = `https://data-generator-v2-tinybird.vercel.app/?host=eu_gcp&token=${tbAppendToken}&datasource=views&eps=1000`;
	const dgUrlCarts = `https://data-generator-v2-tinybird.vercel.app/?host=eu_gcp&token=${tbAppendToken}&datasource=carts&eps=1000`;
	const dgUrlSales = `https://data-generator-v2-tinybird.vercel.app/?host=eu_gcp&token=${tbAppendToken}&datasource=sales&eps=1000`;
</script>

<h1>Ecommerce Demo App used for Tinybird demos</h1>

<h2>Use Tinybird Data Generator to simulate real traffic:</h2>

<ol class="list-decimal">
	<li> Open this <a class="underline" href={dgUrl} target="_blank">link</a>, copy the JSON below and paste it in the
		Schema Builder section.
	</li>
	<li>Click on Save and make sure you see something like {`{
  "date": "2022-08-30T08:30:07",
  "product": "sZzx0cUDX98"
}`} in the Data Preview section
	</li>
  <li>Click on Start Generating! and go back to the demo <a class="underline" href="/">home</a> and check that
  </li>
</ol>
<pre class="bg-black w-96"><code class="text-white">{`{
  "datetime": {
    "type": "datetime"
  },
  "product": {
    "type": "values",
    "params": {
      "values": [
        "sZzx0cUDX98",
        "5d0cgAl5BTk",
        "YY4YaHKh2jQ",
        "p8Drpg_duLw",
        "xFmXLq_KJxg",
        "fSdBxY0NxVI",
        "6cHumpSxTvs",
        "Zu7A1GCSjZE",
        "Fg15LdqpWrs"
      ]
    }
  }
}`}</code></pre>
<p>Note: you can edit the Tinybird Settings in the Data Generator page, or repeat the same process use the following links:</p>
<pre>
<a class="underline" href={dgUrlCarts} target="_blank">link for Carts</a>
<a class="underline" href={dgUrlSales} target="_blank">link for Sales</a>
</pre>

<h2>Planned demo enhancdements can be checked in <a class="underline" href='/todo'>/todo</a></h2>

<h2>Credits</h2>

<p>Photo credits: unsplash</p>

<p>
	Built with <a href="https://kit.svelte.dev/">SvelteKit</a>, realtime personalized thanks to
	<a href="https://www.tinybird.co/">Tinybird</a>
</p>
<p>
	FreeCodeCamp's photo gallery example:
	https://www.freecodecamp.org/learn/2022/responsive-web-design/learn-css-flexbox-by-building-a-photo-gallery/step-1
</p>
<p>
	For a nicer implementation of an ecommerce usind SvelteKit, check <a
		href="https://vercel.com/docs/beginner-sveltekit">this SvelteKit course</a
	>
	and the final <a href="https://vercel.com/templates/svelte/sveltekit-commerce">template</a>
</p>
