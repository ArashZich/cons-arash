// src/_req-hooks/reality/admin/useCreateCategoryPricingMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CreateCategoryPricing from 'src/_requests/reality/admin/createCategoryPricing';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateCategoryPricingRequestBodyType,
  CreateCategoryPricingResponseType,
} from 'src/_types/reality/admin/categoryPricing';

export function useCreateCategoryPricingMutation(
  options?: UseMutationOptions<
    CreateCategoryPricingResponseType,
    ErrorResponse,
    CreateCategoryPricingRequestBodyType
  >
) {
  return useMutation<
    CreateCategoryPricingResponseType,
    ErrorResponse,
    CreateCategoryPricingRequestBodyType
  >((data: CreateCategoryPricingRequestBodyType) => CreateCategoryPricing(data), options);
}
