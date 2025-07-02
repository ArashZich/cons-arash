import { AxiosResponse } from 'axios';
import { HostResponseType } from 'src/_types/bytebase/host';
import { bytebase } from 'src/_clients';

export default async function GetHost(): Promise<HostResponseType> {
  const response = await bytebase.get<void, AxiosResponse<HostResponseType>>('/api/v1/files/host');

  return response.data;
}
