'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
//
import {
  ResetPassword as resetPasswordRequest,
  Login as loginRequest,
  Register as registerRequest,
  UserInfo,
} from 'src/_requests/reality/auth';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { getAllPermissions } from 'src/_requests/site/getAllPermissions';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, PermissionsType } from '../types';
import { AuthContext } from './auth-context';

enum Types {
  Impersonate = 'IMPERSONATE',
  Revert = 'REVERT',
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  Loading = 'LOADING',
}

type Payload = {
  [Types.Impersonate]: {
    user: AuthUserType;
  };
  [Types.Revert]: {
    user: AuthUserType;
  };
  [Types.Initial]: {
    isImpersonated: boolean;
    permissions: PermissionsType;
    user: AuthUserType;
  };
  [Types.Login]: {
    user: AuthUserType;
    permissions: PermissionsType;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUserType;
    permissions: PermissionsType;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
  permissions: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.Impersonate) {
    return {
      ...state,
      user: action.payload.user,
      isImpersonated: true,
    };
  }
  if (action.type === Types.Revert) {
    return {
      ...state,
      user: action.payload.user,
      isImpersonated: false,
    };
  }
  if (action.type === Types.Initial) {
    return {
      loading: false,
      user: action.payload.user,
      permissions: action.payload.permissions,
      isImpersonated: action.payload.isImpersonated,
    };
  }
  if (action.type === Types.Login) {
    return {
      ...state,
      user: action.payload.user,
      permissions: action.payload.permissions,
    };
  }
  if (action.type === Types.Register) {
    return {
      ...state,
      permissions: action.payload.permissions,
      user: action.payload.user,
    };
  }
  if (action.type === Types.Logout) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
export const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';
export const BACKUP_ACCESS_TOKEN_STORAGE_KEY = 'backupAccessToken';
export const BACKUP_REFRESH_TOKEN_STORAGE_KEY = 'backupRefreshToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const initialize = useCallback(async () => {
    try {
      const accessToken =
        localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ||
        sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      const refreshToken =
        localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) ||
        sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
      const backupToken =
        localStorage.getItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY) ||
        sessionStorage.getItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken) && refreshToken && isValidToken(refreshToken)) {
        // TODO: later i should cache remember to set it here otherwise in refresh always remember will be true
        setSession(accessToken, refreshToken);

        const response = await UserInfo();

        const user = response.data;

        const permissions = await getAllPermissions();

        dispatch({
          type: Types.Initial,
          payload: {
            user: user.user,
            permissions,
            isImpersonated: !!backupToken,
          },
        });
      } else {
        dispatch({
          type: Types.Initial,
          payload: {
            user: null,
            permissions: null,
            isImpersonated: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: Types.Initial,
        payload: {
          user: null,
          permissions: null,
          isImpersonated: false,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string, remember: boolean) => {
    const data = {
      username,
      password,
    };

    const {
      data: { access_token, refresh_token, user },
    } = await loginRequest(data);

    setSession(access_token, refresh_token, remember);

    const permissions = await getAllPermissions();

    dispatch({
      type: Types.Login,
      payload: {
        user,
        permissions,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (
      name: string,
      last_name: string,
      phone: string,
      password: string,
      invite_code: string,
      session_code: string
    ) => {
      const data = {
        name,
        last_name,
        phone,
        password,
        invite_code,
        session_code,
      };

      const response = await registerRequest(data);
      const { access_token, refresh_token, user } = response.data;

      setSession(access_token, refresh_token);

      const permissions = await getAllPermissions();

      dispatch({
        type: Types.Register,
        payload: {
          user,
          permissions,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null, null);
    dispatch({ type: Types.Logout });
    router.push(paths.dashboard.root);
    window.location.reload();
  }, [router]);

  const resetPassword = useCallback(
    async (phone: string, password: string, session_code: string) => {
      const data = {
        phone,
        password,
        session_code,
      };
      await resetPasswordRequest(data);
    },
    []
  );

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      permissions: state.permissions,
      //
      login,
      register,
      logout,
      resetPassword,
      initialize,
    }),
    [login, logout, register, resetPassword, status, state.user, state.permissions, initialize]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
