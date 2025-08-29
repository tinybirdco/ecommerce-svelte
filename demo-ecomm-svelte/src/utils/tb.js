export async function sendEvents(events, dsName, dsAppendToken){
  const date = new Date();
  events.forEach(ev => {
      ev.timestamp = date.toISOString().slice(0, 19)
  });
  const headers = {
      'Authorization': `Bearer ${dsAppendToken}`,
  };
  
  const host = import.meta.env.VITE_TB_HOST;
  const url = `${host}/v0/events?name=${dsName}`;
  
  const rawResponse = await fetch(url, {
      method: 'POST',
      body: events.map(JSON.stringify).join('\n'),
      headers: headers,
  });
  const content = await rawResponse.json();
  console.log(content);
}