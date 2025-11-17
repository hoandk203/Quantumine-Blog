# News Page Layout Design

## Overview

Trang News sử dụng layout 3-column với Market Overview và News ở main area, Economic Calendar ở sidebar phải.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Sticky Ticker Tape (full width)                               │
├─────────────────────────────────────────────────────────────────┤
│  Page Header + Quick Stats (full width)                        │
├───────────────────────────────────┬─────────────────────────────┤
│                                   │                             │
│  MAIN CONTENT (2/3 width)         │  SIDEBAR (1/3 width)        │
│                                   │                             │
│  ┌─────────────────────────────┐  │  ┌───────────────────────┐ │
│  │ Market Overview             │  │  │ Economic Calendar     │ │
│  │ - Charts with tabs          │  │  │ - Sticky sidebar      │ │
│  │ - Multiple symbols          │  │  │ - Scrollable events   │ │
│  │ - Height: 500px             │  │  │ - Height: 1200px      │ │
│  └─────────────────────────────┘  │  │                       │ │
│                                   │  │                       │ │
│  ┌─────────────────────────────┐  │  │                       │ │
│  │ News Timeline               │  │  │                       │ │
│  │ - Real-time news feed       │  │  │                       │ │
│  │ - Articles with images      │  │  │                       │ │
│  │ - Height: 1000px            │  │  │                       │ │
│  │ - Infinite scroll           │  │  │                       │ │
│  └─────────────────────────────┘  │  └───────────────────────┘ │
│                                   │                             │
├───────────────────────────────────┴─────────────────────────────┤
│  Info Section (disclaimer)                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (>1024px)
```
┌──────────────────────────┬────────────────┐
│                          │                │
│  Main Content (66%)      │  Sidebar (33%) │
│                          │                │
└──────────────────────────┴────────────────┘
```

### Tablet/Mobile (<1024px)
```
┌───────────────────────────────┐
│                               │
│  Main Content (100%)          │
│                               │
├───────────────────────────────┤
│                               │
│  Sidebar (100%)               │
│  - Moves below main content   │
│                               │
└───────────────────────────────┘
```

## Code Structure

```tsx
<MainLayout>
  {/* Sticky Ticker Tape */}
  <TickerTape />

  {/* Container */}
  <div className="container max-w-[1920px]">
    {/* Header */}
    <PageHeader />

    {/* Quick Stats */}
    <QuickStats />

    {/* 3-Column Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Main Content (2/3) */}
      <div className="lg:col-span-2">
        <MarketOverview />
        <NewsTimeline />
      </div>

      {/* Right: Sidebar (1/3) */}
      <div className="lg:col-span-1">
        <EconomicCalendar sticky />
      </div>
    </div>

    {/* Footer Info */}
    <InfoSection />
  </div>
</MainLayout>
```

## Component Hierarchy

```
NewsPage
├── MainLayout
│   ├── Header (from layout)
│   └── Footer (from layout)
├── TickerTape (sticky)
│   └── TradingViewWidget
├── Container
│   ├── PageHeader
│   │   ├── Title
│   │   └── Description
│   ├── QuickStats
│   │   └── StatCard × 4
│   ├── Grid
│   │   ├── MainContent (col-span-2)
│   │   │   ├── Card: MarketOverview
│   │   │   │   └── TradingViewWidget
│   │   │   └── Card: NewsTimeline
│   │   │       └── TradingViewWidget
│   │   └── Sidebar (col-span-1)
│   │       └── Card: EconomicCalendar (sticky)
│   │           └── TradingViewWidget
│   └── InfoSection
```

## Key Features

### 1. Sticky Elements

**Ticker Tape**
- Position: `sticky top-16`
- Z-index: `40`
- Always visible on scroll

**Economic Calendar Sidebar**
- Position: `sticky top-24`
- Stays in view while main content scrolls
- Height: `1200px` (taller than viewport)
- Internal scrolling

### 2. Grid System

**Tailwind Grid Classes**
```css
.grid-cols-1          /* Mobile: 1 column */
.lg:grid-cols-3       /* Desktop: 3 columns */
.lg:col-span-2        /* Main content: 2 of 3 columns */
.lg:col-span-1        /* Sidebar: 1 of 3 columns */
.gap-6                /* 24px gap between columns */
```

### 3. Max Width

**Container**
- Max width: `1920px`
- Centered with `mx-auto`
- Padding: `px-4` (16px)

This allows full utilization of wide screens while maintaining readability.

### 4. Component Heights

| Component | Height | Reason |
|-----------|--------|--------|
| Market Overview | 500px | Compact view with tabs |
| News Timeline | 1000px | More space for articles |
| Economic Calendar | 1200px | Match total left content height |

## Styling Details

### Cards

```css
.card {
  background: white;
  dark:background: gray-800;
  border-radius: 8px;
  box-shadow: sm;
  overflow: hidden;
}
```

### Card Header

```css
.card-header {
  padding: 16px;
  border-bottom: 1px solid gray-200;
  dark:border-color: gray-700;
}
```

### Card Content

```css
.card-content {
  padding: 0;  /* No padding for widgets */
}
```

### Spacing

```css
.space-y-6 {
  /* 24px vertical spacing between elements */
  > * + * {
    margin-top: 24px;
  }
}
```

## Advantages of This Layout

### ✅ Better UX

1. **Main content focus**: Market Overview and News are primary
2. **Contextual calendar**: Calendar visible while reading news
3. **No tab switching**: All info visible at once
4. **Natural flow**: Top to bottom, left to right

### ✅ Better Performance

1. **Fewer re-renders**: No tab state management
2. **Lazy widgets**: Calendar loads when in viewport
3. **Sticky sidebar**: Better scroll performance than fixed

### ✅ Better Accessibility

1. **Logical tab order**: Left to right, top to bottom
2. **Clear hierarchy**: Main content first, supplementary second
3. **Screen reader friendly**: No hidden tab content

## Comparison: Old vs New

### Old Layout (Tabs)

**Pros:**
- Organized by category
- Less initial load (one tab at a time)
- Familiar pattern

**Cons:**
- Content hidden in tabs
- Requires clicking to switch
- Calendar isolated in separate tab
- More state management

### New Layout (Sidebar)

**Pros:**
- All content visible
- No clicking required
- Calendar always visible
- Simpler code (no tabs state)
- Better for multi-monitor setups

**Cons:**
- More initial load (3 widgets)
- Slightly more scrolling
- Calendar may be missed on mobile

## Mobile Optimization

### Considerations

1. **Vertical Stacking**: Sidebar moves below on mobile
2. **Touch-Friendly**: Larger tap targets in widgets
3. **Scroll Performance**: Virtual scrolling in news
4. **Height Adjustment**: Reduce widget heights on mobile

### Potential Improvements

```tsx
// Responsive heights
const isMobile = useMediaQuery('(max-width: 1024px)');

<MarketOverview
  height={isMobile ? 400 : 500}
/>

<NewsTimeline
  height={isMobile ? 600 : 1000}
/>

<EconomicCalendar
  height={isMobile ? 800 : 1200}
/>
```

## Future Enhancements

### 1. Customizable Layout

Allow users to:
- Drag & drop widgets
- Resize columns
- Toggle sidebar
- Save layout preferences

### 2. Collapsible Sidebar

```tsx
<button onClick={toggleSidebar}>
  {sidebarOpen ? '→' : '←'}
</button>
```

### 3. Floating Action Button (Mobile)

Show calendar button that opens modal on mobile:

```tsx
{isMobile && (
  <FAB onClick={openCalendarModal}>
    <CalendarIcon />
  </FAB>
)}
```

### 4. Split Pane Resizer

Allow users to adjust column widths:

```tsx
<SplitPane
  split="vertical"
  minSize={400}
  maxSize={-400}
  defaultSize="66%"
>
  <MainContent />
  <Sidebar />
</SplitPane>
```

## Performance Monitoring

### Key Metrics to Track

```javascript
// Page load time
const loadTime = performance.now();

// Widget load time
const widgetLoadTime = {
  marketOverview: 0,
  newsTimeline: 0,
  economicCalendar: 0
};

// Scroll performance
const fps = measureFPS();

// Memory usage
const memory = performance.memory.usedJSHeapSize;
```

### Optimization Tips

1. **Lazy Load Calendar**: Load only when scrolled into view
2. **Reduce News Height**: Start with 600px, expand on "Load More"
3. **Cache Widget Configs**: Prevent unnecessary re-renders
4. **Debounce Theme Switch**: Wait 200ms before reloading widgets

## Testing Checklist

### Layout Tests

- [ ] Desktop: 3-column grid displays correctly
- [ ] Tablet: Columns stack at breakpoint
- [ ] Mobile: All widgets full-width
- [ ] Sticky ticker works on all sizes
- [ ] Sticky sidebar works on desktop
- [ ] No horizontal scroll at any width

### Widget Tests

- [ ] Market Overview loads and displays tabs
- [ ] News Timeline shows articles with images
- [ ] Economic Calendar displays events
- [ ] All widgets auto-switch with dark mode
- [ ] Widgets maintain aspect ratio

### Responsive Tests

- [ ] Test at 320px (smallest mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (breakpoint)
- [ ] Test at 1920px (desktop)
- [ ] Test at 2560px (wide monitor)

## Browser Compatibility

Tested on:
- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

Grid support:
- CSS Grid: 96%+ browser support
- Sticky positioning: 95%+ browser support

## Accessibility

### ARIA Labels

```tsx
<aside aria-label="Economic Calendar Sidebar">
  <EconomicCalendar />
</aside>

<main aria-label="Market News and Overview">
  <MarketOverview />
  <NewsTimeline />
</main>
```

### Keyboard Navigation

1. Tab through ticker tape
2. Tab to main content (Market Overview)
3. Tab to news timeline
4. Tab to sidebar (Economic Calendar)
5. Tab to info section

### Screen Reader

```
"Market Overview heading"
"Real-time updates"
[Market Overview widget content]

"News Timeline heading"
"Updated in real-time"
[News articles...]

"Economic Calendar heading"
"Important events"
[Calendar events...]
```

---

## Summary

New layout provides:
- ✅ Better information density
- ✅ No hidden content
- ✅ Contextual calendar sidebar
- ✅ Simpler code (no tabs)
- ✅ Better multi-monitor experience
- ✅ Sticky sidebar for easy reference

Perfect cho financial traders và analysts muốn theo dõi nhiều data streams cùng lúc!

---

**Version**: 2.0
**Date**: October 23, 2025
**Status**: Production
