## Create the .env file

In this folder, `/ecommerce-svelte/tremor-dashboard`, create a .env file with the following structure:

```env
NEXT_PUBLIC_TINYBIRD_HOST=https://api.us-east.tinybird.co or the one that you're using
NEXT_PUBLIC_TINYBIRD_TOKEN=<token_with_access_read_to_the_used_endpoints>
```

## Run the app locally

After running `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
