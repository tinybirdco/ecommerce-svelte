echo "VITE_TB_HOST=https://api.us-east.tinybird.co" >../demo-ecomm-svelte/.env
tb --cloud token copy app_read_token && echo "VITE_TB_READ_TOKEN=$(pbpaste)" >>../demo-ecomm-svelte/.env
tb --cloud token copy "create datasource token" && echo "VITE_TB_STOCK_TOKEN=$(pbpaste)" >>../demo-ecomm-svelte/.env
tb --cloud token copy app_append_token && echo "VITE_TB_APPEND_TOKEN=$(pbpaste)" >>../demo-ecomm-svelte/.env