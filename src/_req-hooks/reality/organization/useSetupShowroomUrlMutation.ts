// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  SetupShowroomUrlRequestBodyType,
  SetupShowroomUrlResponseType,
} from 'src/_types/reality/organization/setupShowroomUrl';

import { SetupShowroomUrl } from 'src/_requests/reality/organization';

export function useSetupShowroomUrlMutation(
  options?: UseMutationOptions<
    SetupShowroomUrlResponseType,
    ErrorResponse,
    SetupShowroomUrlRequestBodyType
  >
) {
  return useMutation<SetupShowroomUrlResponseType, ErrorResponse, SetupShowroomUrlRequestBodyType>(
    (data: SetupShowroomUrlRequestBodyType) => SetupShowroomUrl(data),
    options
  );
}
