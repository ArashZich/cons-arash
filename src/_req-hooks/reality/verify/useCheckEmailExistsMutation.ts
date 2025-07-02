// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CheckEmailExists from 'src/_requests/reality/verify/checkEmailExists';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CheckEmailExistsRequestBodyType,
  CheckEmailExistsResponseType,
} from 'src/_types/reality/verify/checkEmailExists';

export function useCheckEmailExistsMutation(
  options?: UseMutationOptions<
    CheckEmailExistsResponseType,
    ErrorResponse,
    CheckEmailExistsRequestBodyType
  >
) {
  return useMutation<CheckEmailExistsResponseType, ErrorResponse, CheckEmailExistsRequestBodyType>(
    (data: CheckEmailExistsRequestBodyType) => CheckEmailExists(data),
    options
  );
}
