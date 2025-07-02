// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeleteCategories } from 'src/_requests/reality/category';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  DeleteCategoriesRequestBodyData,
  DeleteCategoriesResponseData,
} from 'src/_types/reality/category/deleteCategories';

export function useDeleteCategoriesMutation(
  options?: UseMutationOptions<
    DeleteCategoriesResponseData,
    ErrorResponse,
    DeleteCategoriesRequestBodyData
  >
) {
  return useMutation<DeleteCategoriesResponseData, ErrorResponse, DeleteCategoriesRequestBodyData>(
    (data: DeleteCategoriesRequestBodyData) => DeleteCategories(data),
    options
  );
}
