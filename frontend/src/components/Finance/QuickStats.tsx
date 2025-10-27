'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  change: number;
  icon: 'trending-up' | 'trending-down' | 'activity' | 'dollar';
}

interface QuickStatsProps {
  stats?: StatItem[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  const defaultStats: StatItem[] = [
    {
      label: 'S&P 500',
      value: '4,783.45',
      change: 1.2,
      icon: 'trending-up',
    },
    {
      label: 'Nasdaq',
      value: '14,972.76',
      change: 2.1,
      icon: 'trending-up',
    },
    {
      label: 'Dow Jones',
      value: '37,545.33',
      change: -0.3,
      icon: 'trending-down',
    },
    {
      label: 'VIX',
      value: '13.45',
      change: -2.5,
      icon: 'activity',
    },
  ];

  const displayStats = stats || defaultStats;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up':
        return <TrendingUp className="w-5 h-5" />;
      case 'trending-down':
        return <TrendingDown className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      case 'dollar':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <div
                className={`flex items-center text-sm font-medium ${
                  stat.change >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(stat.change).toFixed(2)}%
              </div>
            </div>
            <div
              className={`p-2 rounded-lg ${
                stat.change >= 0
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              {getIcon(stat.icon)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
