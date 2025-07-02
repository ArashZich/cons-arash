// eslint-disable-next-line import/no-cycle
import { RefreshToken } from 'src/_requests/reality/auth';
import { setSession } from 'src/auth/jwt-context/utils';
import { reality } from '.';

export async function onReject(error: any) {
  // Check if the response status is 401 (Unauthorized)
  if (error.response && error.response.status === 401) {
    console.log('01 Triggering OnReject: Token expired. Refreshing...');

    const old_refresh_token =
      localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    if (!old_refresh_token) {
      throw new Error('No refresh token found');
    }

    // Get the retry count from the request's config, or default it to 0
    error.config.retryCount = error.config.retryCount || 0;

    // If retry count is 3 or more, throw error
    if (error.config.retryCount >= 3) {
      throw new Error('Token refresh failed after 3 attempts');
    }

    try {
      // Call the RefreshToken function to get new tokens
      const result = await RefreshToken({ refresh_token: old_refresh_token });

      const { access_token, refresh_token } = result.data;

      // Update the session with the new tokens
      setSession(access_token, refresh_token);

      // Retry the failed request with the new tokens
      error.config.headers.Authorization = `Bearer ${access_token}`;

      // Increment the retry count
      error.config.retryCount += 1;

      // eslint-disable-next-line @typescript-eslint/return-await
      return reality.request(error.config);
    } catch (refreshError) {
      // Handle token refresh failure
      console.log('Token refresh failed:', refreshError);
      throw refreshError;
    }
  }

  // For other error responses, reject the promise with the error message
  return Promise.reject(
    (error.response && error.response.data) || {
      message: 'خطایی در ارتباط با سرور رخ داد',
    }
  );
}
