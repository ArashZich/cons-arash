import { AxiosResponse } from 'axios';
import { ToggleSuspendResponseType } from 'src/_types/reality/user/toggleOfficial';
import { reality } from 'src/_clients';

export default async function ToggleSuspend(ID: string): Promise<ToggleSuspendResponseType> {
  const response = await reality.patch<void, AxiosResponse<ToggleSuspendResponseType>>(
    `/api/v1/users/${ID}/suspend/toggle`
  );

  return response.data;
}
