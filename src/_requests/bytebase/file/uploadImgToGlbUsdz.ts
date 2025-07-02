import { AxiosResponse } from 'axios';
import {
  UploadFileRequestBodyType,
  UploadImageToGlbUsdzResponseType,
} from 'src/_types/bytebase/uploadImgToGlbUsdz';
import { bytebase } from 'src/_clients';

export default async function UploadImgToGlbUsdz(
  data: UploadFileRequestBodyType
): Promise<UploadImageToGlbUsdzResponseType> {
  const formData = new FormData();
  // Append all files to formData under the same key 'files'
  data.files.forEach((file) => formData.append('files', file));
  formData.append('width', data.width);
  formData.append('length', data.length);
  formData.append('isCircle', String(data.isCircle));
  formData.append('isTile', String(data.isTile));
  formData.append('tiles', data.tiles);
  formData.append('isWall', String(data.isWall));

  const response = await bytebase.post<
    UploadFileRequestBodyType,
    AxiosResponse<UploadImageToGlbUsdzResponseType>
  >('/api/v1/files/upload/img/glb-usdz', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Assuming the response is an array of file upload results
  return response.data;
}
