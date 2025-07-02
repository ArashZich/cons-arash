import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UploadBatchFileRequestBodyType,
  UploadBatchImageToGlbUsdzResponseType,
} from 'src/_types/bytebase/uploadBatchImgToGlbUsdz';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import uploadBatchImgToGlbUsdz from 'src/_requests/bytebase/file/uploadBatchImgToGlbUsdz';

export function useUploadBatchImgToGlbUsdzMutation(
  options?: UseMutationOptions<
    UploadBatchImageToGlbUsdzResponseType,
    ErrorResponse,
    UploadBatchFileRequestBodyType
  >
) {
  return useMutation<
    UploadBatchImageToGlbUsdzResponseType,
    ErrorResponse,
    UploadBatchFileRequestBodyType
  >((data: UploadBatchFileRequestBodyType) => uploadBatchImgToGlbUsdz(data), options);
}
