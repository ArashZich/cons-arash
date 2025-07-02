// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateCategory } from 'src/_requests/reality/category';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateCategoryRequestBodyType,
  CreateCategoryResponseType,
} from 'src/_types/reality/category/createCategory';

// type CreateCategoryMutationType = {
//   requestBody: CreateCategoryRequestBodyType;
// };

export function useCreateCategoryMutation(
  options?: UseMutationOptions<
    CreateCategoryResponseType,
    ErrorResponse,
    CreateCategoryRequestBodyType
  >
) {
  return useMutation<CreateCategoryResponseType, ErrorResponse, CreateCategoryRequestBodyType>(
    (data: CreateCategoryRequestBodyType) => CreateCategory(data),
    options
  );
}
