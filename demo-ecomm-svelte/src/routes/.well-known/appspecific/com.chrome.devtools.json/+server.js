export async function GET() {
  // Return an empty response for Chrome DevTools requests
  return new Response(JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 