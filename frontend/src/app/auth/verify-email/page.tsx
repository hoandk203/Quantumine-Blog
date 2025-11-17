'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import Link from 'next/link';
import { verifyEmail } from '../../../services/AuthService';
import { Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Token xác thực không hợp lệ');
        return;
      }

      if (isVerified) {
        return;
      }

      try {
        const response = await verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email đã được xác thực thành công');
        setIsVerified(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } catch (error: any) {
        console.error('Verify email error:', error);
        const errorMessage = error.response?.data?.message || error.message;

        // Check if email already verified
        if (errorMessage?.includes('already exists') || errorMessage?.includes('already verified')) {
          setStatus('success');
          setMessage('Email đã được xác thực trước đó');
          setIsVerified(true);
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        } else if (errorMessage?.includes('expired') || errorMessage?.includes('Invalid')) {
          setStatus('error');
          setMessage('Token xác thực không hợp lệ hoặc đã hết hạn');
        } else {
          setStatus('error');
          setMessage(errorMessage || 'Có lỗi xảy ra khi xác thực email');
        }
      }
    };

    confirmEmail();
  }, [token, isVerified, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {status === 'loading' && (
            <div className="text-center">
              <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
              <CardTitle className="text-xl">
                Đang xác thực email...
              </CardTitle>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle
                className="w-16 h-16 text-green-500 mx-auto mb-4"
              />
              <CardTitle className="text-xl mb-4">
                Xác thực email thành công!
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {message || 'Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập ngay bây giờ.'}
              </p>
              <Link href="/auth/login" className="block">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  Đăng nhập ngay
                </Button>
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <ErrorIcon
                className="w-16 h-16 text-red-500 mx-auto mb-4"
              />
              <CardTitle className="text-xl mb-4">
                Xác thực thất bại
              </CardTitle>
              <p className="text-red-600 dark:text-red-400 mb-6">
                {message || 'Có lỗi xảy ra khi xác thực email. Vui lòng thử lại.'}
              </p>
              <div className="space-y-3">
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">
                    Quay lại đăng nhập
                  </Button>
                </Link>
                <Link href="/auth/register" className="block">
                  <Button variant="outline" className="w-full">
                    Đăng ký tài khoản mới
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 