import { UserData } from '../user/userData';

export type UserInfoResponseType = {
  stausCode: number;
  data: { user: UserData };
};
