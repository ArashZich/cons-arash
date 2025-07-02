// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CheckPhoneExists from 'src/_requests/reality/verify/checkPhoneExists';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CheckPhoneExistsRequestBodyType,
  CheckPhoneExistsResponseType,
} from 'src/_types/reality/verify/checkPhoneExists';

export function useCheckPhoneExistsMutation(
  options?: UseMutationOptions<
    CheckPhoneExistsResponseType,
    ErrorResponse,
    CheckPhoneExistsRequestBodyType
  >
) {
  return useMutation<CheckPhoneExistsResponseType, ErrorResponse, CheckPhoneExistsRequestBodyType>(
    (data: CheckPhoneExistsRequestBodyType) => CheckPhoneExists(data),
    options
  );
}
