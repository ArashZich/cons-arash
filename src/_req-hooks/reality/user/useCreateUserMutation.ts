// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateUserRequestBodyType,
  CreateUserResponseType,
} from 'src/_types/reality/user/createUser';
import { CreateUser } from 'src/_requests/reality/user';

type CreateUserMutationType = {
  requestBody: CreateUserRequestBodyType;
};

export function useCreateUserMutation(
  options?: UseMutationOptions<CreateUserResponseType, ErrorResponse, CreateUserMutationType>
) {
  return useMutation<CreateUserResponseType, ErrorResponse, CreateUserMutationType>(
    (data: CreateUserMutationType) => CreateUser(data.requestBody),
    options
  );
}
