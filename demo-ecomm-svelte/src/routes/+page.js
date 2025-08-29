import { Category, Stock, Ranking } from '../utils/filters';

export async function load({ fetch, url }) {
  const category = url.searchParams.get('category') || Category.all;
  const ranking = url.searchParams.get('ranking') || Ranking.bestSellers;
  const show_oos = url.searchParams.get('show_oos') || Stock.inStock;
  const token = import.meta.env.VITE_TB_READ_TOKEN;
  const host = import.meta.env.VITE_TB_HOST;
  const params = new URLSearchParams({
    category,
    ranking,
    show_oos,
    token
  });
  const apiUrl = `${host}/v0/pipes/api_product_grid.json?${params}`;
  console.log('API URL:', apiUrl);
  console.log('Token:', token ? 'Present' : 'Missing');
  console.log('Host:', host);
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const res = await response.json();
    if (response.ok) {
      return {
        products: res.data
      };
    } else {
      throw new Error(`Error fetching data: ${res.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Network error: ${error.message}`);
  }
}
