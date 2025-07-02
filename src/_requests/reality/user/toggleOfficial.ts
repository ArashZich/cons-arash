import { AxiosResponse } from 'axios';
import { ToggleOfficialResponseType } from 'src/_types/reality/user/toggleSuspend';
import { reality } from 'src/_clients';

export default async function ToggleOfficial(ID: string): Promise<ToggleOfficialResponseType> {
  const response = await reality.patch<void, AxiosResponse<ToggleOfficialResponseType>>(
    `/api/v1/users/${ID}/official/toggle`
  );

  return response.data;
}
