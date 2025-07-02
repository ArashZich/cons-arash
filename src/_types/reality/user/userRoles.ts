import { UserData } from './userData';

export type UpdateUserRolesRequestBodyType = {
  roles: string[];
  id: string;
};

export type UpdateUserRolesResponseType = {
  statusCode: number;
  data: UserData;
};
