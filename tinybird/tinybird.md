# Tinybird Architecture Documentation

## Data Pipeline Overview

This document describes the Tinybird-specific implementation details for the ecommerce demo project.

## Datasources

### Landing Datasources

#### ecomm_events
Real-time customer interaction events datasource.

**Engine**: MergeTree  
**Sorting Key**: `event, product, timestamp`  
**Partition Key**: `toYear(timestamp)`

**Schema**:
- `timestamp` DateTime - Event occurrence time
- `event` String - Event type (view, cart, sale)
- `product` String - Product identifier

**Tokens**: 
- `app_append_token` (APPEND) - For real-time event ingestion

#### products
Product catalog datasource.

**Engine**: MergeTree  
**Sorting Key**: `category, id`

**Schema**:
- `category` String - Product category
- `id` String - Unique product identifier  
- `name` String - Product display name
- `photo` String - Product image URL
- `price` Float64 - Product price

#### warehouse_stock
Inventory updates from warehouse management system.

**Engine**: MergeTree  
**Sorting Key**: `timestamp, product`  
**Partition Key**: `toYear(timestamp)`

**Schema**:
- `timestamp` DateTime - Update timestamp
- `product` String - Product identifier
- `store` String - Store/warehouse identifier
- `amount` Int32 - Stock quantity change

**Tokens**: 
- `app_append_token` (APPEND) - For inventory updates

### Materialized Datasources

#### mv_latest_availability
Aggregated view of current product availability combining sales and warehouse data.

**Engine**: AggregatingMergeTree  
**Sorting Key**: `product`

**Schema**:
- `product` String - Product identifier
- `available_stock` SimpleAggregateFunction(sum, Int64) - Current stock level

## Materialized Pipes

### mat_stock_sales
Materializes sales impact on inventory from ecommerce events.

**Target**: mv_latest_availability  
**Source**: ecomm_events

Processes 'sale' events and decrements stock using `sumSimpleState(-1)`.

### mat_stock_wh
Materializes warehouse stock updates.

**Target**: mv_latest_availability  
**Source**: warehouse_stock

Processes warehouse updates using `sumSimpleState(amount)`.

## API Endpoints

### api_product_grid
Main product listing endpoint with real-time stock status and trending indicators.

**Tokens**: 
- `app_read_token` (READ)

**Parameters**:
- `category` (String, optional) - Filter by product category ('all' for no filter)
- `show_oos` (String, optional) - Show out of stock products ('1' to include)
- `ranking` (String, optional) - Sort by trending vs price ('1' for trending)

**Features**:
- Stock status calculation (0=in stock, 1=low stock, 2=out of stock)
- Trending product identification (top 3 in-stock products by recent sales)
- Real-time sales hit counting (last hour)

**Pipeline**:
1. `filter_prods` - Category-based product filtering
2. `latest_stock` - Stock status calculation from materialized view
3. `ecomm_hits` - Recent sales activity aggregation
4. `endpoint` - Final result assembly with ranking logic

### api_ui_filters
Dynamic filter options for UI components.

**Tokens**: 
- `app_read_token` (READ)

**Parameters**:
- `filter` (String, required) - Filter type ('product' or 'value')
- `category` (String, optional) - Filter products by category

**Features**:
- Dynamic product list generation
- KPI filter options (sales, carts, views)
- Category-aware filtering

**Pipeline**:
1. `products_` - Product options with category filtering
2. `kpis_` - Available KPI metrics
3. `endpoint` - Conditional response based on filter type

## Data Flow

```
Warehouse Updates → warehouse_stock → mat_stock_wh ↘
                                                    → mv_latest_availability → api_product_grid
Customer Events → ecomm_events → mat_stock_sales ↗

Product Catalog → products → api_product_grid
                           → api_ui_filters
```

## Real-time Processing

### Stock Calculation
Stock levels are maintained in real-time through:
1. **Positive updates**: Warehouse stock additions via `mat_stock_wh`
2. **Negative updates**: Sale events via `mat_stock_sales`
3. **Aggregation**: Combined in `mv_latest_availability` using AggregatingMergeTree

### Trending Logic
Products are marked as "Trending 🔥" when:
- Stock status < 2 (not out of stock)
- Ranked in top 3 by recent sales activity (last hour)
- Ordered by stock_status, then sales hits descending

## Performance Optimizations

### Sorting Keys
- **ecomm_events**: `event, product, timestamp` - Optimized for event-type filtering
- **products**: `category, id` - Optimized for category filtering
- **warehouse_stock**: `timestamp, product` - Optimized for time-series queries
- **mv_latest_availability**: `product` - Optimized for product lookups

### Materialized Views
Pre-computed stock aggregations eliminate real-time calculation overhead for stock status queries.

## Token Security

**Scoped Tokens**:
- `app_read_token`: READ access to API endpoints only
- `app_append_token`: APPEND access to event and stock datasources only

**Usage**:
- Use READ tokens for frontend API calls
- Use APPEND tokens for data ingestion pipelines
- Never expose APPEND tokens in client-side code

## Monitoring and Debugging

### Service Datasources
- `tinybird.pipe_stats_rt` - Real-time endpoint performance
- `tinybird.datasources_ops_log` - Data ingestion monitoring
- `tinybird.endpoint_errors` - API error tracking

### Key Metrics
- Endpoint latency and error rates
- Data ingestion success rates
- Stock calculation accuracy

### Common Issues
- **Stale stock data**: Check materialized pipe health
- **Missing products**: Verify product datasource population
- **API timeouts**: Review sorting key usage in queries