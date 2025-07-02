import { AxiosResponse } from 'axios';
import { LoginRequestBodyType, LoginResponseDataType } from 'src/_types/reality/auth/login';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function Login(data: LoginRequestBodyType): Promise<LoginResponseDataType> {
  const response = await reality.post<LoginRequestBodyType, AxiosResponse<LoginResponseDataType>>(
    '/api/v1/login',
    data
  );

  return response.data;
}
