import { AxiosResponse } from 'axios';
import { S3DownloadResponseType } from 'src/_types/bytebase/s3download';
import { bytebase } from 'src/_clients';

export default async function S3Download(
  key: string
): Promise<S3DownloadResponseType> {
  const response = await bytebase.get<
    void,
    AxiosResponse<S3DownloadResponseType>
  >(`/api/v1/files/download/${key}`);

  return response.data;
}

export function getDownloadUrl(key: string): string {
  return `${process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL}/api/v1/files/download/${key}`;
}
