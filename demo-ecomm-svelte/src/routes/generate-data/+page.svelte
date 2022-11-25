<script>
	const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
	const dgUrl = import.meta.env.VITE_DG_URL;
	const dgUrlEvents = `${dgUrl}?host=eu_gcp&token=${tbAppendToken}&datasource=web_events&eps=1000`;

  const jsonschema = '{"datetime": {"type": "datetime"},"event": {"type": "values_weighted","params": {"values": ["view","cart","sale"],"weights": [60,33,24]}},"product": {"type": "values","params": {"values": ["sZzx0cUDX98","5d0cgAl5BTk","YY4YaHKh2jQ","p8Drpg_duLw","xFmXLq_KJxg","fSdBxY0NxVI","6cHumpSxTvs","Zu7A1GCSjZE","Fg15LdqpWrs"]}}}'
  const jsonsample = '{"datetime": "2022-11-22T19:25:17","event": "sale","product": "5d0cgAl5BTk"}'
  import { compressJSON } from '../../utils/lzma-functions';
  let compJSON = compressJSON(jsonschema);

</script>
<div class="m-4">

  <h1>Use Tinybird Data Generator to simulate real traffic:</h1>
  
  {#await compJSON then lzma}
  <ol class="list-decimal ml-4">
    <li>Open this <a class="underline" href={`${dgUrlEvents}&schema=${lzma}`} target="_blank">link</a>, check that the JSON in Schema Builder section is like the one below and click on Save.</li>
    <li>Make sure you see something like: <br> 
      <pre class="bg-black w-96 mt-3 mb-3"><code class="text-white">{JSON.stringify(JSON.parse(jsonsample), null, 4)}</code></pre>
      <br>in the Data Preview section.
	  </li>
    <li>Click on Start Generating! and go back to the demo <a class="underline" href="/">main page</a> to check that the grid changes after each refresh.</li>
</ol>
<p>👇 This is the JSON you should see in the Schema Builder section.</p>
<pre class="bg-black w-96 mt-3 mb-3 ml-6"><code class="text-white">{JSON.stringify(JSON.parse(jsonschema), null, 4)}</code></pre>
{/await}
</div>
