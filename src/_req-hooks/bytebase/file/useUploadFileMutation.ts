// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UploadFileRequestBodyType, UploadFileResponseType } from 'src/_types/bytebase/file';

import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import UploadFile from 'src/_requests/bytebase/file/uploadFile';

export function useUploadFileMutation(
  options?: UseMutationOptions<UploadFileResponseType, ErrorResponse, UploadFileRequestBodyType>
) {
  return useMutation<UploadFileResponseType, ErrorResponse, UploadFileRequestBodyType>(
    (data: UploadFileRequestBodyType) => UploadFile(data),
    options
  );
}
