import { AxiosResponse } from 'axios';
import {
  UpdateUserRequestBodyType,
  UpdateUserResponseType,
} from 'src/_types/reality/user/updateUser';
import { reality } from 'src/_clients';

export default async function UpdateUser(
  user: UpdateUserRequestBodyType
): Promise<UpdateUserResponseType> {
  const response = await reality.post<
    UpdateUserRequestBodyType,
    AxiosResponse<UpdateUserResponseType>
  >(`/api/v1/accounts/update`, user);

  return response.data;
}
