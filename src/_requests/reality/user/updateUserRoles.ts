import { AxiosResponse } from 'axios';
import {
  UpdateUserRolesRequestBodyType,
  UpdateUserRolesResponseType,
} from 'src/_types/reality/user/userRoles';
import { reality } from 'src/_clients';

export default async function UpdateUserRoles(
  user: UpdateUserRolesRequestBodyType
): Promise<UpdateUserRolesResponseType> {
  const response = await reality.put<
    UpdateUserRolesRequestBodyType,
    AxiosResponse<UpdateUserRolesResponseType>
  >(`/api/v1/users/${user.id}/roles/update`, {
    roles: user.roles,
  });

  return response.data;
}
