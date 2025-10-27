'use client';

import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import TickerTape from '../../components/Finance/TickerTape';
import MarketOverview from '../../components/Finance/MarketOverview';
import EconomicCalendar from '../../components/Finance/EconomicCalendar';
import NewsTimeline from '../../components/Finance/NewsTimeline';
import QuickStats from '../../components/Finance/QuickStats';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const NewsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Ticker Tape - Fixed at top */}
        <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 shadow-sm">
          <TickerTape />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Main Layout: Content Left + Sidebar Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content - Main Area (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Market Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Tổng quan thị trường</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Cập nhật real-time
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <MarketOverview height={500} />
                </CardContent>
              </Card>

              {/* News Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Tin tức hôm nay</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Cập nhật theo thời gian thực
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <NewsTimeline
                    height={1000}
                    feedMode="market"
                    market="stock"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Economic Calendar (1/3 width) */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Lịch kinh tế</span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      Sự kiện quan trọng
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <EconomicCalendar
                    height={1200}
                    importanceFilter="-1,0,1"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Về dữ liệu thị trường
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Dữ liệu được cung cấp bởi TradingView và được cập nhật theo thời gian thực.
                  Thông tin này chỉ mang tính chất tham khảo và không phải là lời khuyên đầu tư.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsPage;
