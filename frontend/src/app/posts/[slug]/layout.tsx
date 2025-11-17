import { Metadata } from 'next';
import { Container, Box, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../../components/Layout/MainLayout';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  
  // Chuyển đổi slug thành title dễ đọc
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${title} | QuantBlog`,
    description: `Đọc bài viết: ${title} - Khám phá những kiến thức hữu ích tại QuantBlog`,
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <Box>
        {children}
      </Box>
  );
}