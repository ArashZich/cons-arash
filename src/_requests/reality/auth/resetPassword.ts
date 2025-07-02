import { AxiosResponse } from 'axios';
import {
  ResetPasswordRequestBodyType,
  ResetPasswordResponseDataType,
} from 'src/_types/reality/auth/resetPassword';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function ResetPassword(
  data: ResetPasswordRequestBodyType
): Promise<ResetPasswordResponseDataType> {
  const response = await reality.post<
    ResetPasswordRequestBodyType,
    AxiosResponse<ResetPasswordResponseDataType>
  >('/api/v1/resetPassword', data);

  return response.data;
}
