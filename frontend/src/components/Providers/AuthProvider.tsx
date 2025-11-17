'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store';
import { checkAuth, setUser } from '../../store/slices/authSlice';
import NotificationManager from '../Common/NotificationManager';

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: any;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialUser }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Auth pages where we should NOT check auth (to avoid 401 errors)
  const authPages = ['/auth/login', '/auth/register'];
  const isAuthPage = authPages.some(route => pathname?.startsWith(route));

  useEffect(() => {
    // Nếu có initial user từ server-side nhưng Redux chưa có user
    if (initialUser && !user) {
      dispatch(setUser(initialUser));
      return;
    }

    // Check auth on all pages EXCEPT auth pages
    // This ensures user data persists across page reloads
    if (!isAuthPage && !user && !initialUser) {
      dispatch(checkAuth());
    }
  }, [dispatch, user, initialUser, isAuthPage]);

  return (
    <>
      {children}
      {/* <NotificationManager /> */}
    </>
  );
};

export default AuthProvider; 