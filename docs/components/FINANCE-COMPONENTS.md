# Finance UI Components Documentation

## Overview

Tài liệu này mô tả chi tiết các components cần thiết để xây dựng giao diện tài chính tương tự Google Finance, bao gồm danh sách chỉ số thị trường, lịch công bố thu nhập, tin tức tài chính và watchlist.

---

## Table of Contents

1. [Design System](#design-system)
2. [Market Indices Component](#1-market-indices-component)
3. [Earnings Calendar Component](#2-earnings-calendar-component)
4. [Financial News Component](#3-financial-news-component)
5. [Ticker/Watchlist Component](#4-tickerwatchlist-component)
6. [Shared Components](#shared-components)
7. [Data Models](#data-models)

---

## Design System

### Color Palette

```css
/* Primary Colors */
--primary-purple: #6200ee;
--primary-blue: #2962ff;
--google-blue: #1a73e8;

/* Status Colors */
--gain-green: #0f9d58;
--loss-red: #d93025;
--neutral-gray: #5f6368;

/* Background */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-hover: #f1f3f4;

/* Text */
--text-primary: #202124;
--text-secondary: #5f6368;
--text-disabled: rgba(0,0,0,.38);

/* Dark Mode */
--dark-bg: #202124;
--dark-surface: #3c4043;
--dark-text: #e8eaed;
```

### Typography

```css
/* Font Family */
font-family: 'Google Sans', 'Roboto', 'Helvetica', Arial, sans-serif;

/* Font Sizes */
--font-xs: 0.75rem;    /* 12px - Caption */
--font-sm: 0.875rem;   /* 14px - Body small */
--font-base: 1rem;     /* 16px - Body */
--font-lg: 1.125rem;   /* 18px - Subtitle */
--font-xl: 1.25rem;    /* 20px - Heading small */
--font-2xl: 1.5rem;    /* 24px - Heading */
--font-3xl: 2rem;      /* 32px - Display */

/* Font Weights */
--font-regular: 400;
--font-medium: 500;
--font-bold: 700;
```

### Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
             0 1px 3px 1px rgba(60, 64, 67, 0.15);
--shadow-md: 0 1px 3px 0 rgba(60, 64, 67, 0.3),
             0 4px 8px 3px rgba(60, 64, 67, 0.15);
--shadow-lg: 0 2px 6px 2px rgba(60, 64, 67, 0.15),
             0 8px 24px 4px rgba(60, 64, 67, 0.15);
```

---

## 1. Market Indices Component

### Description

Hiển thị danh sách các chỉ số thị trường chứng khoán (S&P 500, Dow Jones, Nasdaq, VN-Index, etc.) với giá hiện tại và % thay đổi.

### Visual Design

```
┌───────────────────────────────────────────────────────────────┐
│  Market Indices                                    [View All] │
├───────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ S&P 500     │  │ Dow Jones   │  │ Nasdaq      │          │
│  │ 4,783.45    │  │ 37,545.33   │  │ 14,972.76   │          │
│  │ ↑ 1.2%      │  │ ↓ 0.3%      │  │ ↑ 2.1%      │          │
│  │ +57.45      │  │ -112.67     │  │ +308.90     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└───────────────────────────────────────────────────────────────┘
```

### Component Structure

```tsx
<MarketIndices>
  <Header>
    <Title>Market Indices</Title>
    <ViewAllButton />
  </Header>

  <IndicesList>
    <IndexCard>
      <IndexSymbol />
      <CurrentPrice />
      <ChangeIndicator>
        <PercentageChange />
        <AbsoluteChange />
      </ChangeIndicator>
      <MiniChart /> {/* Optional */}
    </IndexCard>
  </IndicesList>
</MarketIndices>
```

### Props Interface

```typescript
interface MarketIndicesProps {
  indices: MarketIndex[];
  loading?: boolean;
  onIndexClick?: (symbol: string) => void;
  showChart?: boolean;
  variant?: 'compact' | 'detailed';
}

interface MarketIndex {
  symbol: string;          // 'SPX', 'DJI', 'IXIC', 'VNINDEX'
  name: string;            // 'S&P 500', 'Dow Jones', etc.
  currentPrice: number;
  change: number;          // Absolute change
  changePercent: number;   // Percentage change
  currency?: string;       // 'USD', 'VND'
  chartData?: number[];    // For mini sparkline
  lastUpdated?: Date;
}
```

### Styling Specifications

#### Index Card
```css
.index-card {
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  min-width: 180px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.index-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  cursor: pointer;
}
```

#### Symbol & Name
```css
.index-symbol {
  font-size: var(--font-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.index-name {
  font-size: var(--font-xs);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
}
```

#### Price Display
```css
.current-price {
  font-size: var(--font-2xl);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: var(--space-2);
}
```

#### Change Indicator
```css
.change-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.change-positive {
  color: var(--gain-green);
}

.change-negative {
  color: var(--loss-red);
}

.percentage-change {
  font-size: var(--font-sm);
  font-weight: var(--font-medium);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.absolute-change {
  font-size: var(--font-xs);
  font-weight: var(--font-regular);
}

/* Arrow Icons */
.arrow-up::before {
  content: "↑";
  margin-right: 2px;
}

.arrow-down::before {
  content: "↓";
  margin-right: 2px;
}
```

#### Layout
```css
.indices-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-4);
  overflow-x: auto;
  padding-bottom: var(--space-2);
}

/* Mobile: Horizontal scroll */
@media (max-width: 768px) {
  .indices-list {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .index-card {
    flex: 0 0 160px;
    scroll-snap-align: start;
  }
}
```

### Interactive States

- **Hover**: Elevation increase, slight upward translation
- **Click**: Navigate to index detail page
- **Loading**: Skeleton loader với shimmer effect
- **Error**: Show error badge với retry button

### Accessibility

```tsx
<div
  role="button"
  tabIndex={0}
  aria-label={`${name} ${currentPrice} ${changePercent > 0 ? 'up' : 'down'} ${Math.abs(changePercent)}%`}
  onKeyPress={(e) => e.key === 'Enter' && onClick()}
>
```

---

## 2. Earnings Calendar Component

### Description

Hiển thị lịch công bố thu nhập của các công ty, được nhóm theo ngày và thời gian.

### Visual Design

```
┌────────────────────────────────────────────────────────┐
│  Earnings Calendar                          [Filter ▼] │
├────────────────────────────────────────────────────────┤
│  Today - October 23, 2025                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📊 AAPL    Apple Inc.                     16:00  │  │
│  │    Q4 2024 Earnings Report                       │  │
│  │    Est. EPS: $1.39                               │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📊 MSFT    Microsoft Corporation    After Close  │  │
│  │    Quarterly Results                             │  │
│  │    Est. EPS: $2.65                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  Tomorrow - October 24, 2025                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📊 GOOGL   Alphabet Inc.              Pre-Market │  │
│  │    Q3 2024 Earnings                              │  │
│  │    Est. EPS: $1.85                               │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Component Structure

```tsx
<EarningsCalendar>
  <Header>
    <Title>Earnings Calendar</Title>
    <FilterDropdown>
      <Option>All</Option>
      <Option>This Week</Option>
      <Option>Following</Option>
    </FilterDropdown>
  </Header>

  <CalendarList>
    <DateGroup>
      <DateHeader />
      <EarningsCard>
        <CompanyInfo>
          <Ticker />
          <CompanyName />
        </CompanyInfo>
        <EarningsDetails>
          <ReportType />
          <EstimatedEPS />
          <Time />
        </EarningsDetails>
      </EarningsCard>
    </DateGroup>
  </CalendarList>
</EarningsCalendar>
```

### Props Interface

```typescript
interface EarningsCalendarProps {
  events: EarningsEvent[];
  filter?: 'all' | 'week' | 'following';
  onEventClick?: (event: EarningsEvent) => void;
  onFilterChange?: (filter: string) => void;
  loading?: boolean;
}

interface EarningsEvent {
  id: string;
  ticker: string;           // 'AAPL', 'MSFT', 'GOOGL'
  companyName: string;      // 'Apple Inc.'
  reportDate: Date;
  reportTime: 'pre-market' | 'after-close' | 'time'; // or specific time
  specificTime?: string;    // '16:00', '09:30'
  fiscalQuarter: string;    // 'Q4 2024'
  reportType?: string;      // 'Earnings Report', 'Quarterly Results'
  estimatedEPS?: number;    // Expected earnings per share
  actualEPS?: number;       // Actual EPS (after report)
  isConfirmed: boolean;
  marketCap?: number;
}
```

### Styling Specifications

#### Date Group
```css
.date-group {
  margin-bottom: var(--space-6);
}

.date-header {
  font-size: var(--font-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  padding: var(--space-2) 0;
  border-bottom: 1px solid #e0e0e0;
}

.date-header.today {
  color: var(--primary-blue);
}
```

#### Earnings Card
```css
.earnings-card {
  background: var(--bg-primary);
  border: 1px solid #e0e0e0;
  border-left: 3px solid var(--primary-blue);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-3);
  transition: all 0.2s ease;
}

.earnings-card:hover {
  border-left-color: var(--google-blue);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.earnings-card.unconfirmed {
  border-left-color: var(--neutral-gray);
  opacity: 0.8;
}
```

#### Company Info
```css
.company-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.ticker {
  font-size: var(--font-sm);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

.company-name {
  font-size: var(--font-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  flex: 1;
}

.report-time {
  font-size: var(--font-xs);
  color: var(--text-secondary);
  background: var(--bg-hover);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
}
```

#### Earnings Details
```css
.earnings-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.report-type {
  font-size: var(--font-sm);
  color: var(--text-secondary);
}

.estimated-eps {
  font-size: var(--font-xs);
  color: var(--text-secondary);
}

.estimated-eps .label {
  font-weight: var(--font-medium);
}

.estimated-eps .value {
  color: var(--text-primary);
  font-weight: var(--font-medium);
}
```

#### Filter Dropdown
```css
.filter-dropdown {
  position: relative;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid #dadce0;
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: var(--font-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  background: var(--bg-hover);
  border-color: var(--google-blue);
}
```

### Interactive States

- **Hover**: Border color change, elevation
- **Click**: Navigate to earnings detail or company page
- **Confirmed/Unconfirmed**: Visual distinction via opacity and border color
- **Past Events**: Grayed out with "Reported" badge

### Accessibility

```tsx
<article
  role="article"
  aria-label={`${companyName} earnings report on ${reportDate}`}
  tabIndex={0}
>
```

---

## 3. Financial News Component

### Description

Hiển thị danh sách tin tức tài chính mới nhất với thumbnail, tiêu đề, nguồn và thời gian đăng.

### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│  Financial News Today                      [See All →]  │
├─────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐ │
│  │ [IMG]  Fed Signals Potential Rate Cuts in 2025     │ │
│  │        amid cooling inflation data...              │ │
│  │        Reuters • 2 hours ago                       │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [IMG]  Tech Stocks Rally on Strong Earnings        │ │
│  │        Reports from Major Companies                │ │
│  │        Bloomberg • 5 hours ago                     │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [IMG]  Oil Prices Surge After OPEC Production      │ │
│  │        Cut Announcement                            │ │
│  │        CNBC • 1 day ago                           │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Component Structure

```tsx
<FinancialNews>
  <Header>
    <Title>Financial News Today</Title>
    <SeeAllLink />
  </Header>

  <NewsList>
    <NewsCard>
      <Thumbnail />
      <NewsContent>
        <Headline />
        <Summary /> {/* Optional */}
        <Metadata>
          <Source />
          <Timestamp />
        </Metadata>
      </NewsContent>
    </NewsCard>
  </NewsList>

  <LoadMoreButton /> {/* Optional */}
</FinancialNews>
```

### Props Interface

```typescript
interface FinancialNewsProps {
  articles: NewsArticle[];
  variant?: 'grid' | 'list';
  itemsPerPage?: number;
  showSummary?: boolean;
  onArticleClick?: (article: NewsArticle) => void;
  loading?: boolean;
}

interface NewsArticle {
  id: string;
  headline: string;
  summary?: string;
  source: string;           // 'Reuters', 'Bloomberg', 'CNBC'
  sourceIcon?: string;      // URL to source logo
  publishedAt: Date;
  url: string;
  thumbnail?: string;       // Image URL
  category?: string[];      // ['Markets', 'Technology', 'Commodities']
  relatedTickers?: string[]; // ['AAPL', 'MSFT']
  isPremium?: boolean;
}
```

### Styling Specifications

#### News Card - List Variant
```css
.news-card {
  display: flex;
  gap: var(--space-4);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-3);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.news-card:hover {
  border-color: #e0e0e0;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}
```

#### Thumbnail
```css
.news-thumbnail {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-secondary);
}

.news-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-thumbnail img {
  transform: scale(1.05);
}

/* Placeholder for missing image */
.news-thumbnail-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: var(--font-2xl);
}
```

#### News Content
```css
.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.news-headline {
  font-size: var(--font-base);
  font-weight: var(--font-medium);
  line-height: 1.4;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.news-summary {
  font-size: var(--font-sm);
  line-height: 1.5;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

#### Metadata
```css
.news-metadata {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-xs);
  color: var(--text-secondary);
  margin-top: auto;
}

.news-source {
  font-weight: var(--font-medium);
  color: var(--neutral-gray);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.news-source-icon {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-sm);
}

.news-timestamp {
  color: var(--text-secondary);
}

.news-timestamp::before {
  content: "•";
  margin-right: var(--space-2);
}
```

#### Grid Variant
```css
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
}

.news-card.grid-variant {
  flex-direction: column;
}

.news-card.grid-variant .news-thumbnail {
  width: 100%;
  height: 180px;
}
```

#### Premium Badge
```css
.premium-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px var(--space-2);
  background: #ffd700;
  color: #000;
  font-size: var(--font-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-sm);
}
```

### Interactive States

- **Hover**: Border reveal, slight elevation, thumbnail zoom
- **Click**: Open article in new tab or modal
- **Loading**: Skeleton cards with shimmer
- **Empty State**: "No news available" message with illustration

### Responsive Behavior

```css
/* Tablet */
@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 640px) {
  .news-card {
    flex-direction: column;
  }

  .news-thumbnail {
    width: 100%;
    height: 160px;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 4. Ticker/Watchlist Component

### Description

Hiển thị danh sách cổ phiếu theo dõi với giá real-time, % thay đổi và mini chart.

### Visual Design

```
┌──────────────────────────────────────────────────────┐
│  My Watchlist                    [+ Add] [Edit]      │
├──────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐  │
│  │ AAPL          Apple Inc.                 ▁▂▃▅▇ │  │
│  │ $178.45       ↑ 2.34 (1.33%)                   │  │
│  │ Tech • NASDAQ                                  │  │
│  └────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────┐  │
│  │ GOOGL         Alphabet Inc.              ▇▆▅▄▃ │  │
│  │ $142.67       ↓ 1.23 (0.85%)                   │  │
│  │ Tech • NASDAQ                                  │  │
│  └────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────┐  │
│  │ TSLA          Tesla, Inc.                ▂▃▅▆▇ │  │
│  │ $242.84       ↑ 5.67 (2.39%)                   │  │
│  │ Auto • NASDAQ                                  │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### Component Structure

```tsx
<WatchList>
  <Header>
    <Title>My Watchlist</Title>
    <Actions>
      <AddButton />
      <EditButton />
    </Actions>
  </Header>

  <TickerList>
    <TickerCard>
      <TickerHeader>
        <TickerInfo>
          <Symbol />
          <CompanyName />
        </TickerInfo>
        <MiniChart />
      </TickerHeader>

      <PriceInfo>
        <CurrentPrice />
        <ChangeIndicator>
          <AbsoluteChange />
          <PercentChange />
        </ChangeIndicator>
      </PriceInfo>

      <TickerMeta>
        <Sector />
        <Exchange />
      </TickerMeta>
    </TickerCard>
  </TickerList>

  <EmptyState /> {/* When no tickers */}
</WatchList>
```

### Props Interface

```typescript
interface WatchListProps {
  tickers: Ticker[];
  onTickerClick?: (ticker: string) => void;
  onAddTicker?: () => void;
  onRemoveTicker?: (ticker: string) => void;
  onReorder?: (tickers: string[]) => void;
  isEditMode?: boolean;
  loading?: boolean;
}

interface Ticker {
  symbol: string;              // 'AAPL', 'GOOGL'
  companyName: string;         // 'Apple Inc.'
  currentPrice: number;
  change: number;              // Absolute change
  changePercent: number;       // Percentage change
  currency: string;            // 'USD', 'VND'
  exchange: string;            // 'NASDAQ', 'NYSE', 'HOSE'
  sector?: string;             // 'Technology', 'Finance'
  marketCap?: number;
  volume?: number;
  chartData: number[];         // Array of prices for sparkline
  lastUpdated: Date;
  isMarketOpen?: boolean;
}
```

### Styling Specifications

#### Ticker Card
```css
.ticker-card {
  background: var(--bg-primary);
  border: 1px solid #e0e0e0;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-3);
  transition: all 0.2s ease;
  position: relative;
}

.ticker-card:hover {
  border-color: var(--google-blue);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.ticker-card.edit-mode {
  padding-left: var(--space-10);
}

/* Drag Handle (edit mode) */
.drag-handle {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}
```

#### Ticker Header
```css
.ticker-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-3);
}

.ticker-info {
  flex: 1;
}

.ticker-symbol {
  font-size: var(--font-lg);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.company-name {
  font-size: var(--font-sm);
  color: var(--text-secondary);
  font-weight: var(--font-regular);
}
```

#### Price Info
```css
.price-info {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.current-price {
  font-size: var(--font-xl);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.change-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.absolute-change {
  font-size: var(--font-sm);
  font-weight: var(--font-medium);
}

.percent-change {
  font-size: var(--font-sm);
  font-weight: var(--font-medium);
}

.change-positive {
  color: var(--gain-green);
}

.change-negative {
  color: var(--loss-red);
}
```

#### Mini Chart (Sparkline)
```css
.mini-chart {
  width: 80px;
  height: 40px;
  flex-shrink: 0;
}

.mini-chart svg {
  width: 100%;
  height: 100%;
}

.sparkline-path {
  fill: none;
  stroke-width: 1.5;
}

.sparkline-path.positive {
  stroke: var(--gain-green);
}

.sparkline-path.negative {
  stroke: var(--loss-red);
}

/* Optional: Fill area under sparkline */
.sparkline-fill {
  opacity: 0.1;
}

.sparkline-fill.positive {
  fill: var(--gain-green);
}

.sparkline-fill.negative {
  fill: var(--loss-red);
}
```

#### Ticker Meta
```css
.ticker-meta {
  display: flex;
  gap: var(--space-2);
  font-size: var(--font-xs);
  color: var(--text-secondary);
}

.sector,
.exchange {
  display: inline-flex;
  align-items: center;
}

.sector::after {
  content: "•";
  margin-left: var(--space-2);
}
```

#### Market Status Badge
```css
.market-status {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  font-size: var(--font-xs);
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
}

.market-status.open {
  background: #e6f4ea;
  color: var(--gain-green);
}

.market-status.closed {
  background: var(--bg-secondary);
  color: var(--text-secondary);
}
```

#### Empty State
```css
.watchlist-empty {
  text-align: center;
  padding: var(--space-12) var(--space-4);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: var(--space-4);
  opacity: 0.3;
}

.empty-title {
  font-size: var(--font-lg);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.empty-description {
  font-size: var(--font-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}
```

### Interactive States

- **Hover**: Border highlight, elevation
- **Click**: Navigate to ticker detail page
- **Drag & Drop** (Edit mode): Reorder tickers
- **Remove** (Edit mode): Swipe left or click × button
- **Real-time Updates**: Smooth price transitions with animation

### Real-time Price Updates

```css
@keyframes price-flash-up {
  0%, 100% { background-color: transparent; }
  50% { background-color: rgba(15, 157, 88, 0.2); }
}

@keyframes price-flash-down {
  0%, 100% { background-color: transparent; }
  50% { background-color: rgba(217, 48, 37, 0.2); }
}

.current-price.flash-up {
  animation: price-flash-up 0.6s ease;
}

.current-price.flash-down {
  animation: price-flash-down 0.6s ease;
}
```

### Accessibility

```tsx
<article
  role="article"
  aria-label={`${symbol} ${companyName} stock price ${currentPrice} ${changePercent > 0 ? 'up' : 'down'} ${Math.abs(changePercent)}%`}
  tabIndex={0}
>
```

---

## Shared Components

### 1. Loading Skeleton

```tsx
<Skeleton variant="card" />
<Skeleton variant="text" width="60%" />
<Skeleton variant="circular" size={40} />
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton.card {
  height: 120px;
}

.skeleton.text {
  height: 16px;
  margin-bottom: var(--space-2);
}

.skeleton.circular {
  border-radius: 50%;
}
```

### 2. Button Component

```tsx
interface ButtonProps {
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}
```

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: inherit;
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  outline: none;
}

.button:focus-visible {
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.2);
}

/* Sizes */
.button.small {
  height: 32px;
  padding: 0 var(--space-3);
  font-size: var(--font-sm);
}

.button.medium {
  height: 36px;
  padding: 0 var(--space-4);
  font-size: var(--font-sm);
}

.button.large {
  height: 44px;
  padding: 0 var(--space-6);
  font-size: var(--font-base);
}

/* Filled variant */
.button.filled.primary {
  background: var(--google-blue);
  color: white;
}

.button.filled.primary:hover:not(:disabled) {
  background: #1557b0;
  box-shadow: var(--shadow-sm);
}

/* Outlined variant */
.button.outlined {
  background: transparent;
  border: 1px solid #dadce0;
  color: var(--google-blue);
}

.button.outlined:hover:not(:disabled) {
  background: rgba(26, 115, 232, 0.04);
  border-color: var(--google-blue);
}

/* Text variant */
.button.text {
  background: transparent;
  color: var(--google-blue);
  padding: 0 var(--space-2);
}

.button.text:hover:not(:disabled) {
  background: rgba(26, 115, 232, 0.04);
}

/* Disabled state */
.button:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

/* Loading state */
.button.loading {
  position: relative;
  color: transparent;
}

.button.loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 3. Badge Component

```tsx
interface BadgeProps {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'small' | 'medium';
  children: ReactNode;
}
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  border-radius: var(--radius-full);
  font-weight: var(--font-medium);
}

.badge.small {
  font-size: var(--font-xs);
  padding: 2px var(--space-2);
}

.badge.medium {
  font-size: var(--font-sm);
  padding: var(--space-1) var(--space-3);
}

.badge.success {
  background: #e6f4ea;
  color: var(--gain-green);
}

.badge.error {
  background: #fce8e6;
  color: var(--loss-red);
}

.badge.warning {
  background: #fef7e0;
  color: #f9ab00;
}

.badge.info {
  background: #e8f0fe;
  color: var(--google-blue);
}

.badge.neutral {
  background: var(--bg-secondary);
  color: var(--text-secondary);
}
```

---

## Data Models

### API Response Types

```typescript
// Market Indices API
interface MarketIndicesResponse {
  data: MarketIndex[];
  lastUpdated: string;
}

// Earnings Calendar API
interface EarningsCalendarResponse {
  data: EarningsEvent[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

// Financial News API
interface FinancialNewsResponse {
  articles: NewsArticle[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

// Watchlist API
interface WatchlistResponse {
  watchlistId: string;
  name: string;
  tickers: Ticker[];
  createdAt: string;
  updatedAt: string;
}
```

### WebSocket Events (Real-time Updates)

```typescript
// Price update event
interface PriceUpdateEvent {
  type: 'PRICE_UPDATE';
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

// Market status event
interface MarketStatusEvent {
  type: 'MARKET_STATUS';
  exchange: string;
  status: 'open' | 'closed' | 'pre-market' | 'after-hours';
  timestamp: number;
}
```

---

## Performance Considerations

### 1. Lazy Loading
- Load news articles on scroll (infinite scroll)
- Paginate earnings calendar
- Virtual scrolling for large watchlists

### 2. Caching Strategy
```typescript
// Cache market data for 5 seconds
const CACHE_DURATION = 5000;

// Cache news for 5 minutes
const NEWS_CACHE_DURATION = 300000;
```

### 3. Optimization Techniques
- **Debounce** price updates (max 1 update/second per ticker)
- **Memoize** chart calculations
- **Code splitting** for charts library
- **Image optimization** for news thumbnails (WebP, lazy load)

---

## Testing Requirements

### Unit Tests
- Component rendering with various props
- Price change calculations
- Date formatting
- Color coding (green/red) based on change direction

### Integration Tests
- WebSocket connection and reconnection
- API error handling
- Real-time price updates
- Watchlist CRUD operations

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios (WCAG AA)
- Focus management

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 14+
- Chrome Android: Latest

---

## Dependencies

### Required Libraries

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lightweight-charts": "^4.0.0",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

### Optional Enhancements
- **react-window**: Virtual scrolling
- **framer-motion**: Animations
- **react-query**: Data fetching & caching
- **socket.io-client**: WebSocket connections

---

## Implementation Checklist

- [ ] Set up design system (colors, typography, spacing)
- [ ] Create base Button component
- [ ] Create Badge component
- [ ] Create Loading Skeleton component
- [ ] Implement Market Indices component
- [ ] Implement Earnings Calendar component
- [ ] Implement Financial News component
- [ ] Implement Ticker/Watchlist component
- [ ] Add sparkline charts
- [ ] Implement WebSocket for real-time updates
- [ ] Add responsive layouts
- [ ] Implement accessibility features
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Performance optimization
- [ ] Documentation review

---

## Additional Resources

- [Material Design Guidelines](https://material.io/design)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Performance Best Practices](https://react.dev/learn/render-and-commit)
- [WebSocket Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

---

**Document Version**: 1.0
**Last Updated**: October 23, 2025
**Author**: Development Team
**Status**: Draft