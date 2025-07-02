import { AxiosResponse } from 'axios';
import { UploadFileRequestBodyType, UploadFileResponseType } from 'src/_types/bytebase/file';
import { bytebase } from 'src/_clients';

export default async function uploadMp4ToMp4(
  data: UploadFileRequestBodyType
): Promise<UploadFileResponseType> {
  const formData = new FormData();
  // Append all files to formData under the same key 'files'
  data.files.forEach((file) => formData.append('files', file));

  const response = await bytebase.post<
    UploadFileRequestBodyType,
    AxiosResponse<UploadFileResponseType>
  >('/api/v1/files/upload/mp4/mp4', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Assuming the response is an array of file upload results
  return response.data;
}
