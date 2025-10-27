'use client';

import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { useTheme } from '../../hooks/useTheme';

interface EconomicCalendarProps {
  colorTheme?: 'dark' | 'light';
  width?: string | number;
  height?: number;
  locale?: string;
  importanceFilter?: string;
  isTransparent?: boolean;
}

const EconomicCalendar: React.FC<EconomicCalendarProps> = ({
  colorTheme,
  width = '100%',
  height = 600,
  locale = 'vi',
  importanceFilter = '-1,0,1',
  isTransparent = false,
}) => {
  const systemTheme = useTheme();
  const theme = colorTheme || systemTheme;

  const config = {
    colorTheme: theme,
    isTransparent,
    width,
    height,
    locale,
    importanceFilter,
  };

  return (
    <div className="economic-calendar-container rounded-lg overflow-hidden shadow-sm">
      <TradingViewWidget widgetType="economic-calendar" config={config} />
    </div>
  );
};

export default EconomicCalendar;
