import { UserData } from './userData';

export type UpdateUserRequestBodyType = {
  name: string;
  last_name: string;
  username?: string;
  avatar_url: string;
  phone?: string;
  email: string;
  company_name?: string;
  roles?: string[];
};

export type UpdateUserResponseType = {
  statusCode: number;
  data: UserData;
};
