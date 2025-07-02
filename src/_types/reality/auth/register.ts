import { UserData } from "../user/userData";

export type RegisterRequestBodyType = {
  name: string;
  last_name: string;
  phone: string;
  password: string;
  invite_code: string;
  session_code: string;
};

export type RegisterResponseDataType = {
  statusCode: number;
  data: { user: UserData; access_token: string; refresh_token: string };
};