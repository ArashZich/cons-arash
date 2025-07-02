import { AxiosResponse } from 'axios';
import { LoginResponseDataType } from 'src/_types/reality/auth/login';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function Login(userID: string): Promise<LoginResponseDataType> {
  const response = await reality.post<void, AxiosResponse<LoginResponseDataType>>(
    `/api/v1/impersonate/${userID}`
  );

  return response.data;
}
