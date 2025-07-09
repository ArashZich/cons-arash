// src/_req-hooks/reality/admin/useUpdateCategoryPricingMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import UpdateCategoryPricing from 'src/_requests/reality/admin/updateCategoryPricing';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdateCategoryPricingRequestBodyType,
  UpdateCategoryPricingResponseType,
} from 'src/_types/reality/admin/categoryPricing';

type UpdateCategoryPricingMutationParams = {
  categoryId: number;
  data: UpdateCategoryPricingRequestBodyType;
};

export function useUpdateCategoryPricingMutation(
  options?: UseMutationOptions<
    UpdateCategoryPricingResponseType,
    ErrorResponse,
    UpdateCategoryPricingMutationParams
  >
) {
  return useMutation<
    UpdateCategoryPricingResponseType,
    ErrorResponse,
    UpdateCategoryPricingMutationParams
  >(
    ({ categoryId, data }: UpdateCategoryPricingMutationParams) =>
      UpdateCategoryPricing(categoryId, data),
    options
  );
}
