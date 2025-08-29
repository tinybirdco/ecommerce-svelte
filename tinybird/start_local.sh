tb local start
tb build
echo "VITE_TB_HOST=http://localhost:7181" >../demo-ecomm-svelte/.env.local
tb token copy app_read_token && echo "VITE_TB_READ_TOKEN=$(pbpaste)" >>../demo-ecomm-svelte/.env.local
tb token copy "create datasource token" && echo "VITE_TB_STOCK_TOKEN=$(pbpaste)" >>../demo-ecomm-svelte/.env.local
tb token copy app_append_token && echo "VITE_TB_APPEND_TOKEN=$(pbpaste)" >>../demo-ecomm-svelte/.env.local