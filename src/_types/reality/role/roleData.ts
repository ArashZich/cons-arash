// eslint-disable-next-line import/no-cycle
import { UserData } from '../user/userData';

export type RoleData = {
  ID: string;
  code: string;
  title: string;
  name: string;
  users: UserData[];
  created_at: Date;
  updated_at: Date;
};

export type QueryRolesResponseType = {
  statusCode: number;
  data: RoleData[];
};
