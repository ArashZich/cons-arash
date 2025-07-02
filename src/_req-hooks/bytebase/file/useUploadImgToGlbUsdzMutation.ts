// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UploadFileRequestBodyType,
  UploadImageToGlbUsdzResponseType,
} from 'src/_types/bytebase/uploadImgToGlbUsdz';

import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import uploadImgToGlbUsdz from 'src/_requests/bytebase/file/uploadImgToGlbUsdz';

export function useUploadImgToGlbUsdzMutation(
  options?: UseMutationOptions<
    UploadImageToGlbUsdzResponseType,
    ErrorResponse,
    UploadFileRequestBodyType
  >
) {
  return useMutation<UploadImageToGlbUsdzResponseType, ErrorResponse, UploadFileRequestBodyType>(
    (data: UploadFileRequestBodyType) => uploadImgToGlbUsdz(data),
    options
  );
}
