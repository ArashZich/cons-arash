// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UploadFileRequestBodyType, UploadFileResponseType } from 'src/_types/bytebase/file';

import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import uploadMp4ToMp4 from 'src/_requests/bytebase/file/uploadMp4ToMp4';

export function useUploadMp4ToMp4Mutation(
  options?: UseMutationOptions<UploadFileResponseType, ErrorResponse, UploadFileRequestBodyType>
) {
  return useMutation<UploadFileResponseType, ErrorResponse, UploadFileRequestBodyType>(
    (data: UploadFileRequestBodyType) => uploadMp4ToMp4(data),
    options
  );
}
