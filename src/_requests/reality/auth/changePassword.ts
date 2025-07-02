// eslint-disable-next-line import/no-cycle
import { AxiosResponse } from 'axios';
import { reality } from 'src/_clients';
import {
  ChangePasswordRequestBodyType,
  ChangePasswordResponseType,
} from 'src/_types/reality/auth/changePassword';

export default async function ChangePassword(
  data: ChangePasswordRequestBodyType
): Promise<ChangePasswordResponseType> {
  const response = await reality.patch<
    ChangePasswordRequestBodyType,
    AxiosResponse<ChangePasswordResponseType>
  >(`/api/v1/change-password`, data);

  return response.data;
}
