// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateCategory } from 'src/_requests/reality/category';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdateCategoryRequestBodyType,
  UpdateCategoryResponseType,
} from 'src/_types/reality/category/updateCategory';

export function useUpdateCategoryMutation(
  options?: UseMutationOptions<
    UpdateCategoryResponseType,
    ErrorResponse,
    UpdateCategoryRequestBodyType
  >
) {
  return useMutation<UpdateCategoryResponseType, ErrorResponse, UpdateCategoryRequestBodyType>(
    (data: UpdateCategoryRequestBodyType) => UpdateCategory(data),
    options
  );
}
