import { AxiosResponse } from 'axios';
import {
  UploadBatchFileRequestBodyType,
  UploadBatchImageToGlbUsdzResponseType,
} from 'src/_types/bytebase/uploadBatchImgToGlbUsdz';
import { bytebase } from 'src/_clients';

export default async function UploadBatchImgToGlbUsdz(
  data: UploadBatchFileRequestBodyType
): Promise<UploadBatchImageToGlbUsdzResponseType> {
  const formData = new FormData();

  // اضافه کردن همه فایل‌ها به FormData
  data.files.forEach((file) => formData.append('files', file));

  // اضافه کردن پارامترها
  formData.append('width', data.width);
  formData.append('length', data.length);
  formData.append('isCircle', String(data.isCircle));
  formData.append('isTile', String(data.isTile));
  formData.append('tiles', data.tiles || '1x1');
  formData.append('isWall', String(data.isWall));

  const response = await bytebase.post<
    UploadBatchFileRequestBodyType,
    AxiosResponse<UploadBatchImageToGlbUsdzResponseType>
  >('/api/v1/files/upload/batch/img/glb-usdz', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
