import { AxiosResponse } from 'axios';
import {
  RegisterRequestBodyType,
  RegisterResponseDataType,
} from 'src/_types/reality/auth/register';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function Register(
  data: RegisterRequestBodyType
): Promise<RegisterResponseDataType> {
  const response = await reality.post<
    RegisterRequestBodyType,
    AxiosResponse<RegisterResponseDataType>
  >('/api/v1/register', data);

  return response.data;
}
