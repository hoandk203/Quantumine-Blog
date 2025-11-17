import { Metadata } from 'next';
import Providers from '../components/Providers';
import '../styles/globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "QuantBlog",
  description: "QuantBlog - Nền tảng blog tiên tiến cho cộng đồng",
  icons: {
    icon: '/LOGO/PNG/logo-no-text.png',
    shortcut: '/LOGO/PNG/logo-no-text.png',
    apple: '/LOGO/PNG/logo-no-text.png',
  },
  openGraph: {
    title: "QuantBlog",
    description: "QuantBlog - Nền tảng blog tiên tiến cho cộng đồng",
    images: ['/LOGO/PNG/text-white-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100" suppressHydrationWarning>
        <Providers>
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="beforeInteractive"
          />
            {children}
        </Providers>
      </body>
    </html>
  );
} 