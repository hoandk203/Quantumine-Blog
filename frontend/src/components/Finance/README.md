# Finance Components

Bộ components tài chính sử dụng TradingView widgets và custom components.

## Components

### 1. TradingViewWidget (Base Component)

Component cơ sở để tích hợp TradingView widgets.

```tsx
import TradingViewWidget from '@/components/Finance/TradingViewWidget';

<TradingViewWidget
  widgetType="ticker-tape"
  config={{ colorTheme: 'light', locale: 'vi' }}
/>
```

### 2. TickerTape

Thanh ticker cuộn ngang hiển thị giá cổ phiếu real-time.

```tsx
import TickerTape from '@/components/Finance/TickerTape';

<TickerTape
  colorTheme="light"
  displayMode="adaptive"
  locale="vi"
  symbols={[
    { proName: 'NASDAQ:AAPL', title: 'Apple' },
    { proName: 'NASDAQ:GOOGL', title: 'Google' }
  ]}
/>
```

**Props:**
- `symbols?: Array<{ proName: string; title: string }>` - Danh sách symbols
- `colorTheme?: 'light' | 'dark'` - Theme màu
- `displayMode?: 'adaptive' | 'compact' | 'regular'` - Chế độ hiển thị
- `locale?: string` - Ngôn ngữ (mặc định: 'vi')
- `isTransparent?: boolean` - Nền trong suốt

### 3. MarketOverview

Tổng quan thị trường với charts và tabs.

```tsx
import MarketOverview from '@/components/Finance/MarketOverview';

<MarketOverview
  colorTheme="light"
  height={600}
  locale="vi"
/>
```

**Props:**
- `colorTheme?: 'light' | 'dark'` - Theme màu
- `width?: string | number` - Chiều rộng (mặc định: '100%')
- `height?: number` - Chiều cao (mặc định: 400)
- `locale?: string` - Ngôn ngữ
- `tabs?: Array<{ title: string; symbols: Array<{s: string; d: string}> }>` - Custom tabs

### 4. EconomicCalendar

Lịch các sự kiện kinh tế quan trọng.

```tsx
import EconomicCalendar from '@/components/Finance/EconomicCalendar';

<EconomicCalendar
  colorTheme="light"
  height={800}
  importanceFilter="-1,0,1"
  locale="vi"
/>
```

**Props:**
- `colorTheme?: 'light' | 'dark'` - Theme màu
- `width?: string | number` - Chiều rộng
- `height?: number` - Chiều cao (mặc định: 600)
- `locale?: string` - Ngôn ngữ
- `importanceFilter?: string` - Filter theo độ quan trọng ("-1,0,1" = tất cả)
- `isTransparent?: boolean` - Nền trong suốt

### 5. NewsTimeline

Timeline tin tức tài chính.

```tsx
import NewsTimeline from '@/components/Finance/NewsTimeline';

<NewsTimeline
  colorTheme="light"
  height={800}
  feedMode="market"
  market="stock"
  locale="vi"
/>
```

**Props:**
- `colorTheme?: 'light' | 'dark'` - Theme màu
- `width?: string | number` - Chiều rộng
- `height?: number` - Chiều cao (mặc định: 600)
- `locale?: string` - Ngôn ngữ
- `feedMode?: 'all_symbols' | 'market' | 'symbol'` - Chế độ feed
- `market?: string` - Thị trường ('stock', 'crypto', 'forex')
- `symbol?: string` - Symbol cụ thể (khi feedMode='symbol')
- `isTransparent?: boolean` - Nền trong suốt

### 6. QuickStats

Hiển thị các chỉ số thống kê nhanh.

```tsx
import QuickStats from '@/components/Finance/QuickStats';

<QuickStats
  stats={[
    {
      label: 'S&P 500',
      value: '4,783.45',
      change: 1.2,
      icon: 'trending-up'
    }
  ]}
/>
```

**Props:**
- `stats?: StatItem[]` - Mảng các thống kê

**StatItem:**
```typescript
interface StatItem {
  label: string;          // Tên chỉ số
  value: string;          // Giá trị hiện tại
  change: number;         // % thay đổi
  icon: 'trending-up' | 'trending-down' | 'activity' | 'dollar';
}
```

## Usage Example

### Complete News Page

```tsx
'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import TickerTape from '@/components/Finance/TickerTape';
import MarketOverview from '@/components/Finance/MarketOverview';
import EconomicCalendar from '@/components/Finance/EconomicCalendar';
import NewsTimeline from '@/components/Finance/NewsTimeline';
import QuickStats from '@/components/Finance/QuickStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('news');

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sticky Ticker Tape */}
        <div className="sticky top-16 z-40">
          <TickerTape colorTheme="light" />
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Stats */}
          <QuickStats />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="news">Tin tức</TabsTrigger>
              <TabsTrigger value="market">Thị trường</TabsTrigger>
              <TabsTrigger value="calendar">Lịch</TabsTrigger>
            </TabsList>

            <TabsContent value="news">
              <NewsTimeline height={800} />
            </TabsContent>

            <TabsContent value="market">
              <MarketOverview height={600} />
            </TabsContent>

            <TabsContent value="calendar">
              <EconomicCalendar height={800} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
```

## Styling

Các components tự động responsive và hỗ trợ dark mode.

### Custom Styling

```tsx
<div className="rounded-lg overflow-hidden shadow-lg">
  <MarketOverview colorTheme="light" />
</div>
```

### Dark Mode

```tsx
<NewsTimeline colorTheme="dark" isTransparent={true} />
```

## Performance Tips

1. **Lazy Loading**: Sử dụng dynamic import cho TradingView widgets
```tsx
import dynamic from 'next/dynamic';

const MarketOverview = dynamic(
  () => import('@/components/Finance/MarketOverview'),
  { ssr: false }
);
```

2. **Memoization**: Các components đã được memo để tránh re-render không cần thiết

3. **Script Loading**: Script chỉ load một lần và được cleanup khi unmount

## License & Attribution

⚠️ **Important**: TradingView widgets yêu cầu attribution.

- Logo và link TradingView **KHÔNG ĐƯỢC XÓA**
- Miễn phí cho websites công khai
- Xem thêm: [TradingView Widget License](https://www.tradingview.com/widget-docs/)

## Troubleshooting

### Widget không hiển thị

1. Kiểm tra console errors
2. Đảm bảo component được render client-side (`'use client'`)
3. Kiểm tra network tab xem script có load thành công không

### Script loading multiple times

Sử dụng `memo` và `useRef` để track script loading:

```tsx
const scriptLoadedRef = useRef(false);

useEffect(() => {
  if (scriptLoadedRef.current) return;
  // Load script
  scriptLoadedRef.current = true;
}, []);
```

### Dark mode không hoạt động

Đảm bảo truyền prop `colorTheme`:

```tsx
<MarketOverview colorTheme="dark" />
```

## Advanced Usage

### Custom Symbols List

```tsx
const customSymbols = [
  { s: 'NASDAQ:AAPL', d: 'Apple Inc.' },
  { s: 'NASDAQ:MSFT', d: 'Microsoft Corp.' },
  { s: 'NASDAQ:GOOGL', d: 'Alphabet Inc.' },
];

<MarketOverview
  tabs={[
    {
      title: 'Tech Stocks',
      symbols: customSymbols
    }
  ]}
/>
```

### Real-time Updates

Widgets tự động cập nhật real-time từ TradingView. Không cần thêm logic polling.

## API Reference

Xem chi tiết tại: [TradingView Widget Documentation](https://www.tradingview.com/widget-docs/)

## Support

Nếu gặp vấn đề, xem:
- [TradingView Widget Docs](https://www.tradingview.com/widget-docs/)
- [Widget Integration Guide](/docs/components/WIDGET-INTEGRATION-GUIDE.md)
- [Finance Components Specs](/docs/components/FINANCE-COMPONENTS.md)
