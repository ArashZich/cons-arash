import { AxiosResponse } from 'axios';
import { LogoutResponseDataType } from 'src/_types/reality/auth/logout';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function Logout(): Promise<LogoutResponseDataType> {
  const response = await reality.post<void, AxiosResponse<LogoutResponseDataType>>(
    '/api/v1/logout'
  );

  return response.data;
}
