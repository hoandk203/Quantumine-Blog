'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  content: string;
  source_url: string;
  image_url: string;
  author: string;
  publish_date: string;
  keywords_matched: string[];
  relevance_score: number;
}

interface NewsArticleListProps {
  limit?: number;
  categoryId?: string | null;
}

const NewsArticleList: React.FC<NewsArticleListProps> = ({ limit = 20, categoryId = null }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: '0',
        });

        if (categoryId) {
          params.append('category_id', categoryId);
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/news/articles?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setArticles(data.articles || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [limit, categoryId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Chưa có tin tức nào
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => window.open(article.source_url, '_blank')}
        >
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Article Image */}
              {article.image_url && (
                <div className="relative w-32 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>

                {/* Content Preview */}
                {article.content && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                    {article.content.substring(0, 150)}...
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  {article.author && (
                    <span className="font-medium">{article.author}</span>
                  )}
                  {article.publish_date && (
                    <span>• {formatDate(article.publish_date)}</span>
                  )}
                  {article.keywords_matched && article.keywords_matched.length > 0 && (
                    <span>• {article.keywords_matched.slice(0, 2).join(', ')}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewsArticleList;
