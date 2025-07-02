/* eslint-disable import/no-extraneous-dependencies */
import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
// eslint-disable-next-line import/no-cycle
// import { reality } from 'src/_clients';
// import { RefreshToken } from 'src/_requests/reality/auth';

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
        // const response = await RefreshToken(old_refresh_token);
        // const { access_token, refresh_token } = response;
        // __some_unique_retryCount = 0; // reset retry count after a successful refresh
        // setSession(access_token, refresh_token);
      } catch (e) {
        // eslint-disable-next-line no-plusplus
        __some_unique_retryCount++; // increment retry count
        console.log('Error in handleTokenExpired interval: ', e);
      }
    }, timeLeft);
  } else {
    try {
      // const result = await RefreshToken(old_refresh_token);
      // const { access_token, refresh_token } = result;
      // setSession(access_token, refresh_token);
    } catch (e) {
      // eslint-disable-next-line no-plusplus
      __some_unique_retryCount++; // increment retry count
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
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refresh_token);
    } else {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refresh_token);
    }
    // vault.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // cookbook.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // cloud.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    if (isTokenExpired(accessToken)) {
      const { ExpiresAt } = jwtDecode<{ ExpiresAt: number }>(accessToken);
      console.log('Token ExpiresAt: ', ExpiresAt);
      handleTokenExpired(ExpiresAt, refresh_token).then((r) => console.log(r));
    }
  } else {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('refreshToken');
    // delete vault.defaults.headers.common.Authorization;
    // delete cookbook.defaults.headers.common.Authorization;
    // delete cloud.defaults.headers.common.Authorization;
  }
};

const setBackupSession = (
  backupAccessToken: string | null,
  backupRefreshToken: string | null,
  remember: boolean = true
) => {
  if (backupAccessToken && backupRefreshToken) {
    if (remember) {
      localStorage.setItem('backupAccessToken', backupAccessToken);
      localStorage.setItem('backupRefreshToken', backupRefreshToken);
    } else {
      sessionStorage.setItem('backupAccessToken', backupAccessToken);
      sessionStorage.setItem('backupRefreshToken', backupRefreshToken);
    }
  } else {
    localStorage.removeItem('backupAccessToken');
    sessionStorage.removeItem('backupAccessToken');
    localStorage.removeItem('backupRefreshToken');
    sessionStorage.removeItem('backupRefreshToken');
  }
};

const swapSession = (
  accessToken: string | null,
  refreshToken: string | null,
  remember: boolean = false
) => {
  const prevAccessToken =
    localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  const prevRefreshToken =
    localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  if (prevAccessToken && prevRefreshToken) {
    setBackupSession(prevAccessToken, prevRefreshToken, remember);
    setSession(accessToken, refreshToken, remember);
  }
};

const revertSession = () => {
  const backupAccessToken =
    localStorage.getItem('backupAccessToken') || sessionStorage.getItem('backupAccessToken');
  const backupRefreshToken =
    localStorage.getItem('backupRefreshToken') || sessionStorage.getItem('backupRefreshToken');
  if (backupAccessToken && backupRefreshToken) {
    setBackupSession(null, null);
    setSession(backupAccessToken, backupRefreshToken);

    // vault.defaults.headers.common.Authorization = `Bearer ${backupAccessToken}`;
    // cookbook.defaults.headers.common.Authorization = `Bearer ${backupAccessToken}`;
    // cloud.defaults.headers.common.Authorization = `Bearer ${backupAccessToken}`;
  }
};

export { isValidToken, setSession, setBackupSession, swapSession, revertSession, verify, sign };
