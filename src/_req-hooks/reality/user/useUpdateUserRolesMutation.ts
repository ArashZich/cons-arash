// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateUserRoles } from 'src/_requests/reality/user';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdateUserRolesRequestBodyType,
  UpdateUserRolesResponseType,
} from 'src/_types/reality/user/userRoles';

type UpdateUserMutationType = {
  requestBody: UpdateUserRolesRequestBodyType;
};

export function useUpdateUserRolesMutation(
  options?: UseMutationOptions<UpdateUserRolesResponseType, ErrorResponse, UpdateUserMutationType>
) {
  return useMutation<UpdateUserRolesResponseType, ErrorResponse, UpdateUserMutationType>(
    (data: UpdateUserMutationType) => UpdateUserRoles(data.requestBody),
    options
  );
}
