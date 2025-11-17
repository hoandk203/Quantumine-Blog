'use client';

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  widgetType: 'ticker-tape' | 'market-overview' | 'economic-calendar' | 'timeline' | 'symbol-overview';
  config?: Record<string, any>;
  className?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = memo(({ widgetType, config = {}, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;

    // Map widget types to TradingView script URLs
    const widgetUrls: Record<string, string> = {
      'ticker-tape': 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
      'market-overview': 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
      'economic-calendar': 'https://s3.tradingview.com/external-embedding/embed-widget-events.js',
      'timeline': 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js',
      'symbol-overview': 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js',
    };

    script.src = widgetUrls[widgetType];
    script.innerHTML = JSON.stringify(config);

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [widgetType, config]);

  return (
    <div className={`tradingview-widget-container ${className}`}>
      <div className="tradingview-widget-container__widget" ref={containerRef}></div>
    </div>
  );
});

TradingViewWidget.displayName = 'TradingViewWidget';

export default TradingViewWidget;
