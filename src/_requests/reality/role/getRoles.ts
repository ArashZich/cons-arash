import { AxiosResponse } from 'axios';
import { reality } from 'src/_clients';
import { QueryRolesResponseType } from 'src/_types/reality/role/roleData';

export async function GetRoles() {
  const response = await reality.get<void, AxiosResponse<QueryRolesResponseType>>(
    `/api/v1/roles/list`
  );

  return response.data;
}
