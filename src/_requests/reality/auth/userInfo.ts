import { AxiosResponse } from 'axios';
import { UserInfoResponseType } from 'src/_types/reality/auth/userInfo';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function UserInfo(): Promise<UserInfoResponseType> {
  const response = await reality.get<void, AxiosResponse<UserInfoResponseType>>('/api/v1/userinfo');

  return response.data;
}
