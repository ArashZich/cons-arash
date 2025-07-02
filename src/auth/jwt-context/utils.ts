import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';
import { RefreshToken } from 'src/_requests/reality/auth';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from './auth-provider';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ ExpiresAt: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.ExpiresAt > currentTime;
};

const isTokenExpired = (accessToken: string) => {
  const { ExpiresAt } = jwtDecode<{ ExpiresAt: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return ExpiresAt <= currentTime;
};

let __some_unique_expiredTimer: any;
let __some_unique_retryCount = 0;
const MAX_RETRY_COUNT = 3;

const handleTokenExpired = async (ExpiresAt: number, old_refresh_token: string) => {
  window.clearTimeout(__some_unique_expiredTimer);
  const currentTime = Date.now();
  const timeLeft = ExpiresAt * 1000 - currentTime;
  if (timeLeft > 0 && __some_unique_retryCount < MAX_RETRY_COUNT) {
    __some_unique_expiredTimer = window.setTimeout(async () => {
      console.log('token expired. refreshing:');
      try {
        const response = await RefreshToken({ refresh_token: old_refresh_token });
        const {
          data: { access_token, refresh_token },
        } = response;
        __some_unique_retryCount++; // reset retry count after a successful refresh
        setSession(access_token, refresh_token);
      } catch (e) {
        __some_unique_retryCount += __some_unique_retryCount; // increment retry count
        console.log('Error in handleTokenExpired interval: ', e);
      }
    }, timeLeft);
  } else {
    try {
      const response = await RefreshToken({ refresh_token: old_refresh_token });
      const {
        data: { access_token, refresh_token },
      } = response;

      setSession(access_token, refresh_token);
    } catch (e) {
      __some_unique_retryCount++;
      console.log('Error in handleTokenExpired: ', e);
    }
  }
  if (__some_unique_retryCount >= MAX_RETRY_COUNT) {
    console.error('Failed to refresh the token after multiple attempts.');
    // You can add additional logic here to handle the failure, such as redirecting to a login / path
  }
};

const setSession = (
  accessToken: string | null,
  refresh_token: string | null,
  remember: boolean = true
) => {
  if (accessToken && refresh_token) {
    if (remember) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh_token);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
      sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh_token);
    }
    reality.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    if (!isTokenExpired(accessToken)) {
      const { ExpiresAt } = jwtDecode<{ ExpiresAt: number }>(accessToken);
      // console.log('Token ExpiresAt: ', ExpiresAt);
      handleTokenExpired(ExpiresAt, refresh_token).then((r) => console.log(r));
    }
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.clear();
    delete reality.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
