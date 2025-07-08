// src/_req-hooks/reality/admin/useDeleteDiscountRuleMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import DeleteDiscountRule from 'src/_requests/reality/admin/deleteDiscountRule';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { DeleteDiscountRuleResponseType } from 'src/_types/reality/admin/discountRules';

export function useDeleteDiscountRuleMutation(
  options?: UseMutationOptions<DeleteDiscountRuleResponseType, ErrorResponse, number>
) {
  return useMutation<DeleteDiscountRuleResponseType, ErrorResponse, number>(
    (id: number) => DeleteDiscountRule(id),
    options
  );
}
