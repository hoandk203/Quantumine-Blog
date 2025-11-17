# Component Test Checklist

## Manual Testing Steps

### 1. Test TickerTape Component

**Navigate to**: `/news`

**Expected:**
- [ ] Ticker tape xuất hiện ở top của trang
- [ ] Ticker tape sticky khi scroll
- [ ] Các symbols cuộn từ phải sang trái
- [ ] Hiển thị logo symbols
- [ ] Màu xanh cho tăng, đỏ cho giảm
- [ ] Responsive trên mobile

**Test Cases:**
```
1. Desktop view (>1024px) - Full ticker visible
2. Tablet view (768-1024px) - Compact ticker
3. Mobile view (<768px) - Adaptive ticker
```

---

### 2. Test QuickStats Component

**Location**: News page top section

**Expected:**
- [ ] 4 stat cards hiển thị đúng
- [ ] Icons phù hợp với change direction
- [ ] Màu xanh cho tăng, đỏ cho giảm
- [ ] Responsive grid:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- [ ] Hover effect hoạt động

---

### 3. Test MarketOverview Component

**Location**: News page > Market tab

**Expected:**
- [ ] Widget load thành công
- [ ] 4 tabs: Chỉ số, Hàng hóa, Trái phiếu, Forex
- [ ] Charts hiển thị cho mỗi symbol
- [ ] Click symbol để xem detail
- [ ] Responsive height
- [ ] Data cập nhật real-time

**Test Cases:**
```
1. Switch giữa các tabs
2. Click vào một symbol
3. Resize browser window
4. Dark mode toggle
```

---

### 4. Test NewsTimeline Component

**Location**: News page > News tab

**Expected:**
- [ ] Timeline tin tức load
- [ ] Articles có thumbnail, headline, source, time
- [ ] Click article mở link mới
- [ ] Scroll pagination hoạt động
- [ ] Responsive layout
- [ ] Loading state khi fetch

**Test Cases:**
```
1. Initial load
2. Scroll to load more
3. Click article link
4. Mobile view
```

---

### 5. Test EconomicCalendar Component

**Location**: News page > Calendar tab

**Expected:**
- [ ] Calendar events load
- [ ] Events grouped by date
- [ ] Importance indicators (High/Medium/Low)
- [ ] Time zones correct
- [ ] Responsive table/cards
- [ ] Filter by importance works

**Test Cases:**
```
1. View today's events
2. View upcoming events
3. Filter by importance
4. Mobile card view
```

---

## Integration Testing

### Page Load Performance

**Test**: Open DevTools > Network

**Expected:**
- [ ] TradingView scripts load once
- [ ] No duplicate script loading
- [ ] Total page size < 5MB initial
- [ ] No console errors
- [ ] LCP < 2.5s
- [ ] FID < 100ms

---

### Tab Switching Performance

**Test**: Switch between News/Market/Calendar tabs

**Expected:**
- [ ] Smooth transition (no lag)
- [ ] Widgets don't reload unnecessarily
- [ ] State preserved when switching back
- [ ] No memory leaks

---

### Responsive Behavior

**Test**: Resize browser from 320px to 1920px

**Expected:**
- [ ] No horizontal scroll at any size
- [ ] All content readable on mobile
- [ ] Ticker tape adapts to width
- [ ] Cards stack properly on mobile
- [ ] Touch-friendly on mobile (tap targets > 44px)

---

### Dark Mode

**Test**: Toggle dark mode

**Expected:**
- [ ] All components support dark mode
- [ ] TradingView widgets switch theme
- [ ] Contrast ratios meet WCAG AA
- [ ] No white flashes during toggle

---

## Accessibility Testing

### Keyboard Navigation

**Test**: Tab through page

**Expected:**
- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] Tab order logical
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys navigate where appropriate

---

### Screen Reader

**Test**: VoiceOver (Mac) or NVDA (Windows)

**Expected:**
- [ ] Headings structured (h1, h2, h3)
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Buttons have accessible names
- [ ] ARIA labels where needed

---

### Color Contrast

**Test**: Chrome DevTools > Lighthouse > Accessibility

**Expected:**
- [ ] All text meets WCAG AA (4.5:1)
- [ ] Interactive elements meet contrast
- [ ] Status colors distinguishable
- [ ] Works in Windows High Contrast mode

---

## Browser Compatibility

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS 14+)
- [ ] Chrome Android (latest)

---

## Edge Cases

### 1. No Internet Connection

**Test**: Disconnect network

**Expected:**
- [ ] Error message displayed
- [ ] Retry button available
- [ ] Graceful degradation
- [ ] No crash

---

### 2. Ad Blockers

**Test**: Enable uBlock Origin

**Expected:**
- [ ] Widgets still load (TradingView whitelisted)
- [ ] Or fallback message shown
- [ ] No broken layout

---

### 3. Slow Connection

**Test**: Chrome DevTools > Network > Slow 3G

**Expected:**
- [ ] Loading skeletons shown
- [ ] Progressive rendering
- [ ] No timeout errors
- [ ] User can interact with loaded content

---

### 4. Script Blocked

**Test**: Block s3.tradingview.com

**Expected:**
- [ ] Error boundary catches
- [ ] Fallback UI shown
- [ ] Rest of page still works

---

## Console Checks

Open Console and verify:

```javascript
// No errors
0 Errors

// No warnings (except known Next.js warnings)
✓ No critical warnings

// TradingView loaded
window.TradingView !== undefined

// Scripts loaded once
document.querySelectorAll('script[src*="tradingview"]').length
// Should be reasonable (not 10+)
```

---

## Performance Metrics

Use Lighthouse:

**Expected scores:**
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

---

## Known Issues / Limitations

1. **TradingView Attribution**: Logo cannot be removed (license requirement)
2. **Widget Loading Time**: First load may take 2-3 seconds
3. **Mobile Performance**: Complex charts may be slower on old devices
4. **Data Delay**: Free tier may have 15-minute delay (depends on TradingView)

---

## Automated Testing (Future)

```typescript
// TODO: Add Jest/React Testing Library tests
// TODO: Add Playwright E2E tests
// TODO: Add visual regression tests
```

---

## Sign-off

**Tested by**: ________________
**Date**: ________________
**Environment**: ________________
**Browser**: ________________
**Passed**: [ ] Yes [ ] No

**Notes**:
_______________________________________
_______________________________________
