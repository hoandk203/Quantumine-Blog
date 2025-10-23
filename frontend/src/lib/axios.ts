import axios from 'axios';

const instanceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending/receiving cookies
});

// No need for request interceptor - cookies are sent automatically

// Xử lý refresh token khi token hết hạn
instanceApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Only try to refresh if we got 401 and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint - it will use refreshToken from httpOnly cookie
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true, // Send cookies with refresh request
          }
        );

        // Token refreshed successfully - retry original request
        // New accessToken is now in httpOnly cookie
        return instanceApi(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Don't redirect here - let components handle auth failures
        // This prevents unwanted redirects when users are not logged in
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instanceApi; 