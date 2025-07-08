// src/_req-hooks/reality/admin/useDeleteCategoryPricingMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import DeleteCategoryPricing from 'src/_requests/reality/admin/deleteCategoryPricing';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { DeleteCategoryPricingResponseType } from 'src/_types/reality/admin/categoryPricing';

export function useDeleteCategoryPricingMutation(
  options?: UseMutationOptions<DeleteCategoryPricingResponseType, ErrorResponse, number>
) {
  return useMutation<DeleteCategoryPricingResponseType, ErrorResponse, number>(
    (categoryId: number) => DeleteCategoryPricing(categoryId),
    options
  );
}
