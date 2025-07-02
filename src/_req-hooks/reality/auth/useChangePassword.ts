// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ChangePassword } from 'src/_requests/reality/auth';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  ChangePasswordRequestBodyType,
  ChangePasswordResponseType,
} from 'src/_types/reality/auth/changePassword';

export function useChangePasswordMutation(
  options?: UseMutationOptions<
    ChangePasswordResponseType,
    ErrorResponse,
    ChangePasswordRequestBodyType
  >
) {
  return useMutation<ChangePasswordResponseType, ErrorResponse, ChangePasswordRequestBodyType>(
    (data: ChangePasswordRequestBodyType) => ChangePassword(data),
    options
  );
}
