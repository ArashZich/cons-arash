import { UserData } from "../user/userData";

export type LoginRequestBodyType = {
  username: string;
  password: string;
};

export type LoginResponseDataType = {
  statusCode: number;
  data: {
      user: UserData
      access_token: string;
      refresh_token: string;
  }
};
