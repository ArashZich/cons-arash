import { AxiosResponse } from 'axios';
import { PrivateStreamResponseType } from 'src/_types/bytebase/privateStream';
import { bytebase } from 'src/_clients';

export default async function GetPrivateStream(key: string): Promise<PrivateStreamResponseType> {
  const response = await bytebase.get<void, AxiosResponse<PrivateStreamResponseType>>(
    `/api/v1/files/private-stream/${key}`
  );

  return response.data;
}
