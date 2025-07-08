// src/_req-hooks/reality/admin/useCreateDiscountRuleMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CreateDiscountRule from 'src/_requests/reality/admin/createDiscountRule';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateDiscountRuleRequestBodyType,
  CreateDiscountRuleResponseType,
} from 'src/_types/reality/admin/discountRules';

export function useCreateDiscountRuleMutation(
  options?: UseMutationOptions<
    CreateDiscountRuleResponseType,
    ErrorResponse,
    CreateDiscountRuleRequestBodyType
  >
) {
  return useMutation<
    CreateDiscountRuleResponseType,
    ErrorResponse,
    CreateDiscountRuleRequestBodyType
  >((data: CreateDiscountRuleRequestBodyType) => CreateDiscountRule(data), options);
}
