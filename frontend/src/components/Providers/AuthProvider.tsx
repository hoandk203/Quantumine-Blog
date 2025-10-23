'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { checkAuth, setUser } from '../../store/slices/authSlice';
import NotificationManager from '../Common/NotificationManager';

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: any;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialUser }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Nếu có initial user từ server-side nhưng Redux chưa có user
    if (initialUser && !user) {
      dispatch(setUser(initialUser));
    }

    // Always check auth on mount to verify httpOnly cookie
    // This will fail silently if no valid cookie exists
    else if (!user && !initialUser) {
      dispatch(checkAuth());
    }
  }, [dispatch, user, initialUser]);

  return (
    <>
      {children}
      {/* <NotificationManager /> */}
    </>
  );
};

export default AuthProvider; 