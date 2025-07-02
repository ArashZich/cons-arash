import { UserData } from './userData';

export type GetAllUsersResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: UserData[];
  };
};
