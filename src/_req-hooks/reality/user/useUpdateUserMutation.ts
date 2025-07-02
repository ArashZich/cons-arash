// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateUser } from 'src/_requests/reality/user';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdateUserRequestBodyType,
  UpdateUserResponseType,
} from 'src/_types/reality/user/updateUser';

type UpdateUserMutationType = {
  requestBody: UpdateUserRequestBodyType;
};

export function useUpdateUserMutation(
  options?: UseMutationOptions<UpdateUserResponseType, ErrorResponse, UpdateUserMutationType>
) {
  return useMutation<UpdateUserResponseType, ErrorResponse, UpdateUserMutationType>(
    (data: UpdateUserMutationType) => UpdateUser(data.requestBody),
    options
  );
}
