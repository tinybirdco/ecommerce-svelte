# Ecommerce Demo - Tinybird Project

A real-time ecommerce analytics platform built with Tinybird, featuring product inventory tracking, sales analytics, and dynamic API endpoints.

## Overview

This project demonstrates a complete ecommerce data pipeline that tracks:
- Product catalog management
- Real-time inventory updates from warehouse systems
- Customer events (views, cart additions, purchases)
- Live product rankings and stock status

## Architecture

### Data Sources
- **products**: Product catalog with categories, pricing, and metadata
- **ecomm_events**: Real-time customer interaction events
- **warehouse_stock**: Inventory updates from warehouse management system

### Materialized Views
- **mv_latest_availability**: Real-time product stock aggregation combining sales and warehouse data

### API Endpoints
- **api_product_grid**: Product listing with real-time stock status and trending indicators
- **api_ui_filters**: Dynamic filter options for products and KPIs

## Quick Start

### Prerequisites
- Tinybird CLI installed
- Access to Tinybird workspace

### Setup

1. Clone and navigate to project:
```bash
git clone <repository-url>
cd ecommerce-demo
```

2. Initialize Tinybird project:
```bash
tb init
```

3. Load sample data:
```bash
tb datasource append ecomm_events fixtures/ecomm_events.ndjson
tb datasource append products fixtures/products.ndjson
tb datasource append warehouse_stock fixtures/warehouse_stock.ndjson
```

4. Build and deploy:
```bash
tb build
tb deploy
```

### Testing the APIs

**Get product grid with stock status:**
```bash
curl "http://localhost:7181/v0/pipes/api_product_grid.json?token=<token>"
```

**Filter products by category:**
```bash
curl "http://localhost:7181/v0/pipes/api_product_grid.json?category=electronics&token=<token>"
```

**Get UI filter options:**
```bash
curl "http://localhost:7181/v0/pipes/api_ui_filters.json?filter=product&token=<token>"
```

## Data Model

### Events Schema
- `timestamp`: Event occurrence time
- `event`: Event type (view, cart, sale)
- `product`: Product identifier

### Products Schema
- `id`: Unique product identifier
- `name`: Product display name
- `category`: Product category
- `price`: Product price
- `photo`: Product image URL

### Stock Schema
- `timestamp`: Update timestamp
- `product`: Product identifier
- `store`: Store/warehouse identifier
- `amount`: Stock quantity change

## Features

### Real-time Stock Tracking
The system combines sales events (negative stock impact) with warehouse updates (positive stock impact) to maintain accurate inventory levels.

### Dynamic Product Ranking
Products are ranked based on:
- Stock status (in stock > low stock > out of stock)
- Recent sales activity (trending products marked with 🔥)

### Flexible Filtering
- Category-based product filtering
- Stock status visibility controls
- Ranking vs price-based sorting

## Tokens

The project uses scoped tokens for secure API access:
- `app_read_token`: Read access to endpoints
- `app_append_token`: Append access to event datasources

## Development

### Adding New Events
Append events to the ecomm_events datasource:
```bash
echo '{"timestamp": "2024-01-01 12:00:00", "event": "view", "product": "prod_123"}' | tb datasource append ecomm_events
```

### Monitoring
Use Tinybird service datasources for monitoring:
- `tinybird.pipe_stats_rt`: Real-time API performance
- `tinybird.datasources_ops_log`: Data ingestion logs

## Support

For issues or questions:
- Check Tinybird documentation: https://docs.tinybird.co
- Review service datasources for debugging
- Use `tb logs` for real-time monitoring