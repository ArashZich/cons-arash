import { AxiosResponse } from 'axios';
import { DownloadResponseType } from 'src/_types/bytebase/download';
import { bytebase } from 'src/_clients';

export default async function Download(key: string): Promise<DownloadResponseType> {
  const response = await bytebase.get<void, AxiosResponse<DownloadResponseType>>(
    `/api/v1/files/download/${key}`
  );

  return response.data;
}
