import { AxiosResponse } from 'axios';
import { reality } from 'src/_clients';
import {
  UpdateUserAccountRequestBodyType,
  UpdateUserAccountResponseType,
} from 'src/_types/reality/user/updateUserAccountData';

export async function UpdateUserAccount(
  user: UpdateUserAccountRequestBodyType
): Promise<UpdateUserAccountResponseType> {
  const response = await reality.post<
    UpdateUserAccountRequestBodyType,
    AxiosResponse<UpdateUserAccountResponseType>
  >(`/api/v1/accounts/update`, user);

  return response.data;
}
