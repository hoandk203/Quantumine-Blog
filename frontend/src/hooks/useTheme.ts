'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    // Create observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return theme;
}