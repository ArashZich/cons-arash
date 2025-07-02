// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UploadFileRequestBodyType,
  UploadGlbToUsdzResponseType,
} from 'src/_types/bytebase/glbToUsdz';

import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import uploadGlbToUsdz from 'src/_requests/bytebase/file/uploadGlbToUsdz';

export function useUploadGlbToUsdzMutation(
  options?: UseMutationOptions<
    UploadGlbToUsdzResponseType,
    ErrorResponse,
    UploadFileRequestBodyType
  >
) {
  return useMutation<UploadGlbToUsdzResponseType, ErrorResponse, UploadFileRequestBodyType>(
    (data: UploadFileRequestBodyType) => uploadGlbToUsdz(data),
    options
  );
}
