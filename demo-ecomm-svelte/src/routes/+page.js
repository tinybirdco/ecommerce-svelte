export async function load({ fetch }) {
  const token = import.meta.env.VITE_TB_READ_TOKEN;
  const host = import.meta.env.VITE_TB_HOST;
  const url = `https://${host}/v0/pipes/api_stock_ranking.json?token=${token}`;
  const response = await fetch(url);
  const res = await response.json();
  if (response.ok) {
    return {
      res
    }
  } else {
    throw new Error(res);
  }
}

