# Widget & API Integration Guide

## Overview

Tài liệu này so sánh giữa việc **tự xây dựng components** vs **sử dụng widgets/APIs có sẵn** cho các tính năng tài chính.

---

## Table of Contents

1. [Quick Comparison](#quick-comparison)
2. [TradingView Widgets](#tradingview-widgets)
3. [Financial Data APIs](#financial-data-apis)
4. [Implementation Guide](#implementation-guide)
5. [Recommendations](#recommendations)

---

## Quick Comparison

| Feature | Custom Build | TradingView Widgets | Third-party APIs |
|---------|--------------|---------------------|------------------|
| **Cost** | Development time | Free (with attribution) | Free tier available |
| **Customization** | Full control | Limited theming | Full control |
| **Maintenance** | High | None | Medium |
| **Data Quality** | Depends on API | High quality | Varies by provider |
| **Branding** | Your brand | TradingView attribution required | Your brand |
| **Time to Market** | 2-4 weeks | Minutes to hours | 1-2 weeks |
| **Real-time Data** | Requires WebSocket | Built-in | Depends on plan |
| **Mobile Support** | Custom responsive | Responsive by default | Custom responsive |

---

## TradingView Widgets

### Available Widgets

TradingView cung cấp **8 loại widgets miễn phí**:

#### 1. **Charts**
- Advanced Chart (full-featured)
- Symbol Overview
- Mini Chart (sparkline)

#### 2. **Watchlists**
- Market Overview
- Stock Market (top gainers/losers/active)
- Market Data

#### 3. **Tickers**
- Ticker Tape (scrolling horizontal)
- Ticker (single symbol)
- Single Ticker

#### 4. **News**
- Top Stories
- Timeline

#### 5. **Calendars**
- Economic Calendar
- Earnings Calendar

#### 6. **Screeners**
- Stock Screener
- Forex Screener
- Crypto Screener

#### 7. **Heatmaps**
- Stock Heatmap
- Crypto Heatmap
- Forex Heatmap
- ETF Heatmap

#### 8. **Symbol Details**
- Company Profile
- Fundamental Data
- Technical Analysis

### Pros & Cons

#### ✅ Advantages
- **Zero cost** - Hoàn toàn miễn phí
- **Instant integration** - Embed code sẵn có
- **Professional quality** - UI/UX được polish kỹ
- **Real-time data** - Cập nhật giá real-time
- **Low maintenance** - TradingView maintain
- **Multi-market support** - Stocks, Forex, Crypto, Indices
- **30+ languages** - Hỗ trợ đa ngôn ngữ
- **Mobile responsive** - Tự động responsive

#### ❌ Disadvantages
- **Attribution required** - Phải giữ logo TradingView (không được xóa)
- **Limited customization** - Chỉ custom màu, theme cơ bản
- **No control over updates** - TradingView có thể thay đổi widget bất cứ lúc nào
- **Branding conflict** - Logo TradingView trên trang của bạn
- **Limited styling** - Không thể custom CSS chi tiết
- **Dependency** - Phụ thuộc vào TradingView service
- **Cannot modify data** - Không thể filter/transform data theo ý muốn

### License Terms

⚠️ **Important License Requirements:**

1. **Attribution is MANDATORY** - Logo và link TradingView phải giữ nguyên
2. **Violation consequences** - Có thể bị ban vĩnh viễn, kiện tụng
3. **Commercial use** - Miễn phí cho public websites
4. **Not for private use** - Không dành cho internal tools, blogs cá nhân

### Integration Methods

#### HTML/JavaScript (Basic)

```html
<!-- Market Overview Widget -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
  {
    "colorTheme": "light",
    "dateRange": "12M",
    "showChart": true,
    "locale": "vi",
    "width": "100%",
    "height": 400,
    "largeChartUrl": "",
    "isTransparent": false,
    "showSymbolLogo": true,
    "showFloatingTooltip": false,
    "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
    "plotLineColorFalling": "rgba(41, 98, 255, 1)",
    "gridLineColor": "rgba(240, 243, 250, 0)",
    "scaleFontColor": "rgba(106, 109, 120, 1)",
    "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
    "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
    "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
    "tabs": [
      {
        "title": "Indices",
        "symbols": [
          {"s": "FOREXCOM:SPXUSD", "d": "S&P 500"},
          {"s": "FOREXCOM:NSXUSD", "d": "US 100"},
          {"s": "FOREXCOM:DJI", "d": "Dow 30"}
        ]
      }
    ]
  }
  </script>
</div>
```

#### React Integration

```tsx
import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbols?: Array<{s: string; d: string}>;
  colorTheme?: 'light' | 'dark';
  locale?: string;
}

export const MarketOverviewWidget: React.FC<TradingViewWidgetProps> = ({
  symbols,
  colorTheme = 'light',
  locale = 'vi'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme,
      dateRange: '12M',
      showChart: true,
      locale,
      width: '100%',
      height: 400,
      tabs: [
        {
          title: 'Indices',
          symbols: symbols || [
            {s: 'FOREXCOM:SPXUSD', d: 'S&P 500'},
            {s: 'FOREXCOM:NSXUSD', d: 'US 100'},
          ]
        }
      ]
    });

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbols, colorTheme, locale]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};
```

#### Next.js Integration (with SSR handling)

```tsx
'use client';

import dynamic from 'next/dynamic';

// Disable SSR for TradingView widgets
const TradingViewWidget = dynamic(
  () => import('./TradingViewWidget'),
  { ssr: false }
);

export default function MarketPage() {
  return (
    <div>
      <h1>Market Overview</h1>
      <TradingViewWidget />
    </div>
  );
}
```

### Widget Examples

#### 1. Ticker Tape (Scrolling Ticker)

```html
<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
{
  "symbols": [
    {"proName": "FOREXCOM:SPXUSD", "title": "S&P 500"},
    {"proName": "FOREXCOM:NSXUSD", "title": "US 100"},
    {"description": "Apple", "proName": "NASDAQ:AAPL"},
    {"description": "Microsoft", "proName": "NASDAQ:MSFT"}
  ],
  "showSymbolLogo": true,
  "colorTheme": "light",
  "isTransparent": false,
  "displayMode": "adaptive",
  "locale": "vi"
}
</script>
```

#### 2. Economic Calendar

```html
<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>
{
  "colorTheme": "light",
  "isTransparent": false,
  "width": "100%",
  "height": 400,
  "locale": "vi",
  "importanceFilter": "-1,0,1"
}
</script>
```

#### 3. Mini Chart (Sparkline)

```html
<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>
{
  "symbol": "NASDAQ:AAPL",
  "width": 350,
  "height": 220,
  "locale": "vi",
  "dateRange": "12M",
  "colorTheme": "light",
  "isTransparent": false,
  "autosize": false,
  "largeChartUrl": ""
}
</script>
```

### Customization Options

```typescript
interface WidgetOptions {
  // Common options
  colorTheme: 'light' | 'dark';
  locale: string;  // 'vi', 'en', 'zh', etc.
  width: number | string;
  height: number | string;
  isTransparent: boolean;

  // Chart options
  showChart: boolean;
  dateRange: '1D' | '1M' | '3M' | '12M' | '60M' | 'ALL';

  // Symbol options
  showSymbolLogo: boolean;

  // Color customization
  plotLineColorGrowing: string;
  plotLineColorFalling: string;
  gridLineColor: string;
  scaleFontColor: string;
}
```

---

## Financial Data APIs

### Top Providers Comparison

| Provider | Free Tier | Real-time | Best For | Pricing |
|----------|-----------|-----------|----------|---------|
| **Alpha Vantage** | 500 calls/day | No (15min delay) | Beginners, small projects | Free - $50/mo |
| **Polygon.io** | 5 calls/min | Yes (on paid) | US stocks, crypto | Free - $199/mo |
| **Finnhub** | 60 calls/min | Yes | Mixed data, news | Free - $60/mo |
| **EODHD** | No free tier | Yes | Comprehensive data | $20 - $80/mo |
| **IEX Cloud** | 50k msgs/mo | Yes | US markets | Free - $99/mo |
| **Yahoo Finance (unofficial)** | Unlimited | Yes | Quick prototypes | Free |
| **Financial Modeling Prep** | 250 calls/day | Yes (on paid) | Fundamentals | Free - $30/mo |
| **Twelve Data** | 800 calls/day | No | Multiple assets | Free - $29/mo |

### 1. Alpha Vantage

#### Features
- ✅ **500 API calls/day** (free tier)
- ✅ Historical data (stocks, forex, crypto)
- ✅ Technical indicators (50+ indicators)
- ✅ Fundamental data
- ✅ News & sentiment
- ❌ 15-minute delayed data (free tier)

#### Example: Get Stock Quote

```typescript
// Alpha Vantage API
const ALPHA_VANTAGE_KEY = 'YOUR_API_KEY';

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

async function getStockQuote(symbol: string): Promise<StockQuote> {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const quote = data['Global Quote'];

  return {
    symbol: quote['01. symbol'],
    price: parseFloat(quote['05. price']),
    change: parseFloat(quote['09. change']),
    changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    volume: parseInt(quote['06. volume'])
  };
}

// Usage
const appleQuote = await getStockQuote('AAPL');
console.log(appleQuote);
```

#### Example: Get Historical Data

```typescript
async function getHistoricalData(symbol: string, interval: 'daily' | 'weekly' | 'monthly' = 'daily') {
  const functionMap = {
    daily: 'TIME_SERIES_DAILY',
    weekly: 'TIME_SERIES_WEEKLY',
    monthly: 'TIME_SERIES_MONTHLY'
  };

  const url = `https://www.alphavantage.co/query?function=${functionMap[interval]}&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const timeSeriesKey = Object.keys(data).find(key => key.includes('Time Series'));
  const timeSeries = data[timeSeriesKey];

  return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
    date,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseInt(values['5. volume'])
  }));
}
```

### 2. Polygon.io

#### Features
- ✅ Real-time data (paid plans)
- ✅ US stocks, options, forex, crypto
- ✅ Historical data
- ✅ Market status
- ❌ Limited free tier (5 calls/min)

#### Example: Get Real-time Quote

```typescript
const POLYGON_API_KEY = 'YOUR_API_KEY';

async function getPolygonQuote(symbol: string) {
  const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${POLYGON_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const ticker = data.ticker;

  return {
    symbol: ticker.ticker,
    price: ticker.day.c,  // close
    change: ticker.todaysChange,
    changePercent: ticker.todaysChangePerc,
    volume: ticker.day.v,
    high: ticker.day.h,
    low: ticker.day.l
  };
}
```

### 3. Finnhub

#### Features
- ✅ **60 calls/minute** (free tier)
- ✅ Real-time data
- ✅ Company news
- ✅ Earnings calendar
- ✅ WebSocket support

#### Example: Get Quote & News

```typescript
const FINNHUB_API_KEY = 'YOUR_API_KEY';

// Get stock quote
async function getFinnhubQuote(symbol: string) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    currentPrice: data.c,
    change: data.d,
    changePercent: data.dp,
    high: data.h,
    low: data.l,
    open: data.o,
    previousClose: data.pc
  };
}

// Get company news
async function getFinnhubNews(symbol: string, from: string, to: string) {
  const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`;

  const response = await fetch(url);
  const news = await response.json();

  return news.map((article: any) => ({
    headline: article.headline,
    summary: article.summary,
    source: article.source,
    url: article.url,
    image: article.image,
    publishedAt: new Date(article.datetime * 1000)
  }));
}

// Get earnings calendar
async function getEarningsCalendar(from: string, to: string) {
  const url = `https://finnhub.io/api/v1/calendar/earnings?from=${from}&to=${to}&token=${FINNHUB_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.earningsCalendar;
}
```

#### WebSocket for Real-time Data

```typescript
const socket = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);

socket.addEventListener('open', () => {
  // Subscribe to multiple symbols
  socket.send(JSON.stringify({type: 'subscribe', symbol: 'AAPL'}));
  socket.send(JSON.stringify({type: 'subscribe', symbol: 'GOOGL'}));
  socket.send(JSON.stringify({type: 'subscribe', symbol: 'MSFT'}));
});

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);

  if (message.type === 'trade') {
    message.data.forEach((trade: any) => {
      console.log(`${trade.s}: $${trade.p} (volume: ${trade.v})`);
      // Update UI with real-time price
    });
  }
});

// Unsubscribe
socket.send(JSON.stringify({type: 'unsubscribe', symbol: 'AAPL'}));
```

### 4. Yahoo Finance (Unofficial)

⚠️ **Note**: Yahoo không có official API, nhưng có nhiều libraries community-maintained.

#### Using yfinance (Python)

```python
import yfinance as yf

# Get stock data
aapl = yf.Ticker("AAPL")

# Current price
print(aapl.info['currentPrice'])

# Historical data
hist = aapl.history(period="1mo")

# Earnings calendar
print(aapl.calendar)

# News
print(aapl.news)
```

#### Using yahoo-finance2 (Node.js)

```typescript
import yahooFinance from 'yahoo-finance2';

// Get quote
const quote = await yahooFinance.quote('AAPL');
console.log(quote.regularMarketPrice);

// Historical data
const history = await yahooFinance.historical('AAPL', {
  period1: '2024-01-01',
  period2: '2024-12-31',
  interval: '1d'
});

// Search symbols
const results = await yahooFinance.search('Apple');
```

---

## Implementation Guide

### Approach 1: Pure TradingView Widgets (Fastest)

**Timeline**: 1-2 hours

**Steps**:
1. Visit [TradingView Widget Docs](https://www.tradingview.com/widget-docs/)
2. Select widgets cần thiết
3. Customize theme, colors, symbols
4. Copy embed code
5. Paste vào React/Next.js components

**Best for**:
- MVP/Prototype nhanh
- Không cần customization nhiều
- Chấp nhận TradingView branding
- Không có budget cho development

**Example Project Structure**:
```
src/
  components/
    widgets/
      MarketOverview.tsx      (TradingView widget)
      TickerTape.tsx          (TradingView widget)
      EconomicCalendar.tsx    (TradingView widget)
      NewsWidget.tsx          (TradingView widget)
  pages/
    market.tsx
```

---

### Approach 2: Hybrid (TradingView + Custom Components)

**Timeline**: 1-2 weeks

**Strategy**:
- Use TradingView for **charts** (phức tạp, khó tự build)
- Build custom components for **lists, cards, tables** (dễ customize)

**Example**:

```tsx
// Custom Watchlist Component
import { useQuery } from '@tanstack/react-query';
import { getFinnhubQuote } from '@/lib/finnhub';

export function Watchlist({ symbols }: { symbols: string[] }) {
  return (
    <div className="watchlist">
      {symbols.map(symbol => (
        <TickerCard key={symbol} symbol={symbol} />
      ))}
    </div>
  );
}

function TickerCard({ symbol }: { symbol: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => getFinnhubQuote(symbol),
    refetchInterval: 5000 // Refresh every 5s
  });

  if (isLoading) return <Skeleton />;

  return (
    <div className="ticker-card">
      <h3>{symbol}</h3>
      <p className="price">${data.currentPrice}</p>
      <p className={data.change > 0 ? 'positive' : 'negative'}>
        {data.change > 0 ? '↑' : '↓'} {data.changePercent.toFixed(2)}%
      </p>
    </div>
  );
}
```

```tsx
// TradingView Chart for detail page
import dynamic from 'next/dynamic';

const TradingViewChart = dynamic(
  () => import('@/components/widgets/AdvancedChart'),
  { ssr: false }
);

export default function StockDetailPage({ symbol }: { symbol: string }) {
  return (
    <div>
      <Watchlist symbols={[symbol]} />
      <TradingViewChart symbol={symbol} />
    </div>
  );
}
```

**Best for**:
- Cần branding riêng
- Muốn control UX chi tiết
- OK với việc dùng TradingView cho charts
- Budget và timeline vừa phải

---

### Approach 3: Full Custom Build

**Timeline**: 3-4 weeks

**Tech Stack**:
```json
{
  "data": "Finnhub API + WebSocket",
  "charts": "Lightweight Charts (TradingView library)",
  "state": "React Query + Zustand",
  "UI": "Tailwind CSS + Radix UI"
}
```

**Architecture**:

```typescript
// lib/api/finnhub.ts
export class FinnhubClient {
  private apiKey: string;
  private ws: WebSocket | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getQuote(symbol: string) { /* ... */ }
  async getNews(symbol: string) { /* ... */ }
  async getEarnings() { /* ... */ }

  connectWebSocket(symbols: string[], onUpdate: (data: any) => void) {
    this.ws = new WebSocket(`wss://ws.finnhub.io?token=${this.apiKey}`);

    this.ws.onopen = () => {
      symbols.forEach(symbol => {
        this.ws?.send(JSON.stringify({type: 'subscribe', symbol}));
      });
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };
  }

  disconnect() {
    this.ws?.close();
  }
}
```

```typescript
// hooks/useRealtimePrice.ts
import { useEffect, useState } from 'react';
import { finnhubClient } from '@/lib/api/finnhub';

export function useRealtimePrice(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    finnhubClient.connectWebSocket(symbols, (data) => {
      if (data.type === 'trade') {
        data.data.forEach((trade: any) => {
          setPrices(prev => ({
            ...prev,
            [trade.s]: trade.p
          }));
        });
      }
    });

    return () => finnhubClient.disconnect();
  }, [symbols]);

  return prices;
}
```

```tsx
// components/Watchlist/index.tsx
import { useRealtimePrice } from '@/hooks/useRealtimePrice';
import { TickerCard } from './TickerCard';

export function Watchlist() {
  const symbols = ['AAPL', 'GOOGL', 'MSFT'];
  const prices = useRealtimePrice(symbols);

  return (
    <div className="grid gap-4">
      {symbols.map(symbol => (
        <TickerCard
          key={symbol}
          symbol={symbol}
          price={prices[symbol]}
        />
      ))}
    </div>
  );
}
```

**Best for**:
- Cần full control
- Long-term product
- Có budget development
- Requirements phức tạp

---

## Recommendations

### 🎯 For MVP / Quick Prototype

**Use**: TradingView Widgets 100%

**Rationale**:
- Zero development time
- Professional quality
- Free
- Perfect cho validation

**Limitations to accept**:
- TradingView branding
- Limited customization

---

### 🎯 For Production Product (Budget conscious)

**Use**: Hybrid approach

**Mix**:
- ✅ TradingView: Charts, Heatmaps, Screeners
- ✅ Finnhub API: Real-time quotes, News, Earnings
- ✅ Custom: Watchlists, Ticker cards, News cards

**Why**:
- Best balance của cost vs customization
- Charts rất phức tạp để tự build
- Lists/Cards dễ customize
- Finnhub free tier đủ cho small-medium apps

**Sample Budget**:
```
Development: 2 weeks
Finnhub API: $0-60/month (depending on usage)
Hosting: $10-50/month
Total: ~$500-1000 initial + $70-110/month
```

---

### 🎯 For Enterprise / White-label Product

**Use**: Full custom build

**Stack**:
- **Charts**: Lightweight Charts library (Apache 2.0 license)
- **Data**: EODHD or Polygon.io (comprehensive data)
- **Real-time**: WebSocket connections
- **Backend**: Cache layer với Redis
- **Frontend**: React + TypeScript + Tailwind

**Why**:
- Full branding control
- Custom features
- Scalable architecture
- No attribution requirements

**Sample Budget**:
```
Development: 4-6 weeks ($10k-20k)
API: EODHD $80/month or Polygon $199/month
Infrastructure: $200-500/month
Total: ~$10k-20k initial + $300-700/month
```

---

## Decision Matrix

Use this to decide:

| Question | TradingView Widgets | Hybrid | Full Custom |
|----------|---------------------|--------|-------------|
| Timeline < 1 week? | ✅ YES | ❌ NO | ❌ NO |
| Budget < $1000? | ✅ YES | ✅ YES | ❌ NO |
| Need custom branding? | ❌ NO | ⚠️ Partial | ✅ YES |
| Need data control? | ❌ NO | ✅ YES | ✅ YES |
| MVP/Prototype? | ✅ YES | ⚠️ Maybe | ❌ NO |
| Production ready? | ⚠️ Maybe | ✅ YES | ✅ YES |
| Need real-time? | ✅ YES | ✅ YES | ✅ YES |
| White-label product? | ❌ NO | ❌ NO | ✅ YES |

---

## Sample Implementation Plan

### Phase 1: MVP (Week 1)
- [ ] Integrate TradingView Ticker Tape widget
- [ ] Integrate TradingView Market Overview widget
- [ ] Integrate TradingView Economic Calendar widget
- [ ] Add News widget
- [ ] Basic layout và styling

**Deliverable**: Working prototype với real data

---

### Phase 2: Enhancement (Week 2-3)
- [ ] Replace Market Overview với custom Watchlist component
- [ ] Integrate Finnhub API for real-time quotes
- [ ] Build custom News Cards component
- [ ] Build custom Earnings Calendar
- [ ] Add search functionality

**Deliverable**: Hybrid solution với custom branding

---

### Phase 3: Optimization (Week 4)
- [ ] Add caching layer
- [ ] Implement WebSocket for real-time updates
- [ ] Add error handling và retry logic
- [ ] Performance optimization
- [ ] Add loading states và skeletons
- [ ] Mobile responsive refinements

**Deliverable**: Production-ready application

---

## Code Examples Repository

Full working examples available at:

```
examples/
  tradingview-widgets/
    react-basic/
    nextjs-advanced/
  finnhub-api/
    rest-api/
    websocket-realtime/
  hybrid-approach/
    watchlist-custom/
    charts-tradingview/
  full-custom/
    complete-dashboard/
```

---

## Resources

### Documentation
- [TradingView Widget Docs](https://www.tradingview.com/widget-docs/)
- [Finnhub API Docs](https://finnhub.io/docs/api)
- [Alpha Vantage Docs](https://www.alphavantage.co/documentation/)
- [Polygon.io Docs](https://polygon.io/docs)
- [Lightweight Charts](https://tradingview.github.io/lightweight-charts/)

### Libraries
- [react-query](https://tanstack.com/query/latest) - Data fetching
- [zustand](https://zustand-demo.pmnd.rs/) - State management
- [date-fns](https://date-fns.org/) - Date formatting
- [yahoo-finance2](https://github.com/gadicc/node-yahoo-finance2) - Yahoo Finance API

### Tutorials
- [Building a Stock Dashboard with React](https://www.youtube.com/results?search_query=react+stock+dashboard)
- [Real-time WebSocket with Finnhub](https://finnhub.io/docs/api/websocket-trades)
- [Lightweight Charts Tutorial](https://tradingview.github.io/lightweight-charts/tutorials/how_to/series-basics)

---

**Document Version**: 1.0
**Last Updated**: October 23, 2025
**Status**: Ready for Review