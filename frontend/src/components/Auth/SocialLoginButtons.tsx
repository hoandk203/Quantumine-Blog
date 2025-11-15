'use client';

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import GoogleLogo from '../SVG/GoogleLogo';
import { setUser } from '../../store/slices/authSlice';
import { useAppDispatch } from '../../store';
import { loginGoogleCode } from '../../services/AuthService';

const SocialLoginButtons = () => {
    const router = useRouter();
    const [client, setClient] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Function to initialize Google client
        const initGoogleClient = () => {
            if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
                const googleClient = window.google.accounts.oauth2.initCodeClient({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
                    ux_mode: 'popup',
                    scope: 'email profile',
                    callback: async (response: any) => {
                        if (response.code) {
                            setIsLoading(true);
                            try {
                                const result = await loginGoogleCode(response.code);

                                // Lưu user vào Redux store
                                dispatch(setUser(result.user));

                                // Hiển thị thông báo thành công
                                toast.success(`Chào mừng bạn, ${result.user.name}!`);

                                // Redirect về trang chủ hoặc trang được chỉ định
                                router.push('/');
                            } catch (error: any) {
                                console.error('Google login failed:', error);
                                toast.error(error?.response?.data?.message || 'Đăng nhập Google thất bại');
                            } finally {
                                setIsLoading(false);
                            }
                        }
                    },
                });
                setClient(googleClient);
                return true; // Successfully initialized
            }
            return false; // Not ready yet
        };

        // Try to initialize immediately
        const initialized = initGoogleClient();

        // If not available yet, retry after a short delay
        if (!initialized) {
            const timeoutId = setTimeout(() => {
                initGoogleClient();
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [router, dispatch]);

    const handleGoogleLogin = () => {
        if (client) {
            client.requestCode();
        } else {
            toast.error('Google login not available yet, please try again');
        }
    };

    return (
        <div className="space-y-3">
            <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3"
                onClick={handleGoogleLogin}
                disabled={isLoading}
            >
                <GoogleLogo />
                {isLoading ? 'Đang xử lý...' : 'Đăng nhập với Google'}
            </Button>
        </div>
    );
};

export default SocialLoginButtons;
