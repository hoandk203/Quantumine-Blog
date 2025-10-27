'use client';

import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { useTheme } from '../../hooks/useTheme';

interface MarketOverviewProps {
  colorTheme?: 'dark' | 'light';
  width?: string | number;
  height?: number;
  locale?: string;
  tabs?: Array<{
    title: string;
    symbols: Array<{ s: string; d: string }>;
    originalTitle?: string;
  }>;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({
  colorTheme,
  width = '100%',
  height = 400,
  locale = 'vi',
  tabs,
}) => {
  const systemTheme = useTheme();
  const theme = colorTheme || systemTheme;
  const defaultTabs = [
    {
      title: 'Chỉ số',
      symbols: [
        { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
        { s: 'FOREXCOM:NSXUSD', d: 'US 100' },
        { s: 'FOREXCOM:DJI', d: 'Dow 30' },
        { s: 'INDEX:NKY', d: 'Nikkei 225' },
        { s: 'INDEX:DEU40', d: 'DAX Index' },
        { s: 'FOREXCOM:UKXGBP', d: 'FTSE 100' },
      ],
      originalTitle: 'Indices',
    },
    {
      title: 'Hàng hóa',
      symbols: [
        { s: 'CME_MINI:ES1!', d: 'S&P 500' },
        { s: 'CME:6E1!', d: 'Euro' },
        { s: 'COMEX:GC1!', d: 'Gold' },
        { s: 'NYMEX:CL1!', d: 'Oil' },
        { s: 'NYMEX:NG1!', d: 'Gas' },
        { s: 'CBOT:ZC1!', d: 'Corn' },
      ],
      originalTitle: 'Commodities',
    },
    {
      title: 'Trái phiếu',
      symbols: [
        { s: 'CME:GE1!', d: 'Eurodollar' },
        { s: 'CBOT:ZB1!', d: 'T-Bond' },
        { s: 'CBOT:UB1!', d: 'Ultra T-Bond' },
        { s: 'EUREX:FGBL1!', d: 'Euro Bund' },
        { s: 'EUREX:FBTP1!', d: 'Euro BTP' },
        { s: 'EUREX:FGBM1!', d: 'Euro BOBL' },
      ],
      originalTitle: 'Bonds',
    },
    {
      title: 'Forex',
      symbols: [
        { s: 'FX:EURUSD', d: 'EUR to USD' },
        { s: 'FX:GBPUSD', d: 'GBP to USD' },
        { s: 'FX:USDJPY', d: 'USD to JPY' },
        { s: 'FX:USDCHF', d: 'USD to CHF' },
        { s: 'FX:AUDUSD', d: 'AUD to USD' },
        { s: 'FX:USDCAD', d: 'USD to CAD' },
      ],
      originalTitle: 'Forex',
    },
  ];

  const config = {
    colorTheme: theme,
    dateRange: '12M',
    showChart: true,
    locale,
    width,
    height,
    largeChartUrl: '',
    isTransparent: false,
    showSymbolLogo: true,
    showFloatingTooltip: false,
    plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
    plotLineColorFalling: 'rgba(41, 98, 255, 1)',
    gridLineColor: 'rgba(240, 243, 250, 0)',
    scaleFontColor: 'rgba(106, 109, 120, 1)',
    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
    belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
    symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
    tabs: tabs || defaultTabs,
  };

  return (
    <div className="market-overview-container">
      <TradingViewWidget widgetType="market-overview" config={config} />
    </div>
  );
};

export default MarketOverview;
