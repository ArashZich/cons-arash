// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  DeleteUsersResponseData,
  DeleteUsersRequestBodyData,
} from 'src/_types/reality/user/deleteUsers';
import { DeleteUsers } from 'src/_requests/reality/user';

type DeleteUserMutationType = {
  requestBody: DeleteUsersRequestBodyData;
};

export function useDeleteUsersMutation(
  options?: UseMutationOptions<DeleteUsersResponseData, ErrorResponse, DeleteUserMutationType>
) {
  return useMutation<DeleteUsersResponseData, ErrorResponse, DeleteUserMutationType>(
    (data: DeleteUserMutationType) => DeleteUsers(data.requestBody),
    options
  );
}
