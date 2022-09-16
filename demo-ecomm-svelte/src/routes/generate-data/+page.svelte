<script>
	const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
	const dgUrl = import.meta.env.VITE_DG_URL;
	const dgUrlViews = `${dgUrl}?host=eu_gcp&token=${tbAppendToken}&datasource=views&eps=1000`;
	const dgUrlCarts = `${dgUrl}?host=eu_gcp&token=${tbAppendToken}&datasource=carts&eps=500`;
	const dgUrlSales = `${dgUrl}?host=eu_gcp&token=${tbAppendToken}&datasource=sales&eps=100`;

  const jsonchema = '{"datetime":{"type": "datetime"},"product": {"type": "values","params": {"values":["sZzx0cUDX98","5d0cgAl5BTk","YY4YaHKh2jQ","p8Drpg_duLw","xFmXLq_KJxg","fSdBxY0NxVI","6cHumpSxTvs","Zu7A1GCSjZE","Fg15LdqpWrs"]}}}'
  import { compressJSON } from '../../utils/lzma-functions';
  let compJSON = compressJSON(jsonchema);

</script>
<div class="m-4">

  <h1>Use Tinybird Data Generator to simulate real traffic:</h1>
  
  {#await compJSON then lzma}
  <ol class="list-decimal ml-4">
    <li>Open this <a class="underline" href={`${dgUrlViews}&schema=${lzma}`} target="_blank">link</a>, check that the JSON in Schema Builder section is like the one below and click on Save.</li>
    <li>Make sure you see something like <br> 
<code class="p-2 bg-black text-white">{`{
  "date": "2022-08-30T08:30:07",
  "product": "sZzx0cUDX98"
}`}</code>
<br>in the Data Preview section
	</li>
  <li>Click on Start Generating! and go back to the demo <a class="underline" href="/">main page</a> and check that the grid changes after each refresh.</li>
</ol>
<p>👇 This is the JSON you should see in the Schema Builder section.</p>
<pre class="bg-black w-96 mt-3 mb-3 ml-6"><code class="text-white">{JSON.stringify(JSON.parse(jsonchema), null, 4)}</code></pre>
<p>Note: you can edit the Tinybird Settings in the Data Generator page, or repeat the same process use the following links:</p>
<pre>
  <a class="underline" href={`${dgUrlCarts}&schema=${lzma}`} target="_blank">link for Carts</a>
  <a class="underline" href={`${dgUrlSales}&schema=${lzma}`} target="_blank">link for Sales</a>
</pre>
{/await}
</div>
