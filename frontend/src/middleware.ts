import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  // Note: With httpOnly cookies, we can still read them in middleware (server-side)
  // However, cookie validation should be done on client-side via AuthProvider
  // Middleware only does basic redirect logic

  // Các route cần authentication - only redirect if definitely no cookie
  const protectedPaths = ['/dashboard', '/profile'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !accessToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Các route không cần auth khi đã đăng nhập
  // Note: We skip this check because cookie existence doesn't guarantee validity
  // Let client-side handle redirect after checking auth with backend

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/posts/create/:path*',
    '/profile/:path*',
  ],
}; 