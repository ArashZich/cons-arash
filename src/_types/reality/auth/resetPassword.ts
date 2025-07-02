import { UserData } from '../user/userData';

export type ResetPasswordRequestBodyType = {
  phone: string;
  password: string;
  session_code: string;
};

export type ResetPasswordResponseDataType = {
  statusCode: number;
  data: { user: UserData };
};
