'use client';

import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { useTheme } from '../../hooks/useTheme';

interface TickerTapeProps {
  symbols?: Array<{ proName: string; title: string }>;
  colorTheme?: 'dark' | 'light';
  isTransparent?: boolean;
  displayMode?: 'adaptive' | 'compact' | 'regular';
  locale?: string;
}

const TickerTape: React.FC<TickerTapeProps> = ({
  symbols,
  colorTheme,
  isTransparent = false,
  displayMode = 'adaptive',
  locale = 'vi',
}) => {
  const systemTheme = useTheme();
  const theme = colorTheme || systemTheme;
  const defaultSymbols = [
    { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
    { proName: 'FOREXCOM:NSXUSD', title: 'US 100' },
    { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
    { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
    { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
    { description: 'Apple', proName: 'NASDAQ:AAPL' },
    { description: 'Microsoft', proName: 'NASDAQ:MSFT' },
    { description: 'Google', proName: 'NASDAQ:GOOGL' },
    { description: 'Tesla', proName: 'NASDAQ:TSLA' },
    { description: 'Amazon', proName: 'NASDAQ:AMZN' },
  ];

  const config = {
    symbols: symbols || defaultSymbols,
    showSymbolLogo: true,
    colorTheme: theme,
    isTransparent,
    displayMode,
    locale,
  };

  return (
    <div className="ticker-tape-container">
      <TradingViewWidget widgetType="ticker-tape" config={config} />
    </div>
  );
};

export default TickerTape;
