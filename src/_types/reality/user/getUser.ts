import { UserData } from './userData';

export type GetUserResponseType = {
  statusCode: number;
  data: UserData[];
};

export type GetUserSingleResponseType = {
  statusCode: number;
  data: UserData;
};
