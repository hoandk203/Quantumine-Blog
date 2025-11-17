'use client';

import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { useTheme } from '../../hooks/useTheme';

interface NewsTimelineProps {
  colorTheme?: 'dark' | 'light';
  width?: string | number;
  height?: number;
  locale?: string;
  feedMode?: 'all_symbols' | 'market' | 'symbol';
  market?: string;
  symbol?: string;
  isTransparent?: boolean;
}

const NewsTimeline: React.FC<NewsTimelineProps> = ({
  colorTheme,
  width = '100%',
  height = 600,
  locale = 'vi',
  feedMode = 'market',
  market = 'stock',
  symbol,
  isTransparent = false,
}) => {
  const systemTheme = useTheme();
  const theme = colorTheme || systemTheme;

  const config = {
    feedMode,
    market,
    symbol,
    colorTheme: theme,
    isTransparent,
    displayMode: 'regular',
    width,
    height,
    locale,
  };

  return (
    <div className="news-timeline-container rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800">
      <TradingViewWidget widgetType="timeline" config={config} />
    </div>
  );
};

export default NewsTimeline;
