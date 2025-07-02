import { UserData } from 'src/_types/reality/user/userData';
import { SitePermissionsType } from 'src/_types/site/permissions';

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type PermissionsType = SitePermissionsType | null;

export type AuthUserType = null | UserData;

type Methods = {
  login: (username: string, password: string, remember: boolean) => Promise<void>;
  register: (
    name: string,
    last_name: string,
    phone: string,
    password: string,
    invite_code: string,
    session_code: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  resetPassword: (phone: string, password: string, session_code: string) => Promise<void>;
};

export type JWTContextType = Methods & {
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  permissions: PermissionsType;
};

// ----------------------------------------------------------------------

export type AuthStateType = {
  user: AuthUserType;
  status?: string;
  loading: boolean;
  permissions: PermissionsType;
};
