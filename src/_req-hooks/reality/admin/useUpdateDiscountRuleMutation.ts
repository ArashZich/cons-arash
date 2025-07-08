// src/_req-hooks/reality/admin/useUpdateDiscountRuleMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import UpdateDiscountRule from 'src/_requests/reality/admin/updateDiscountRule';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdateDiscountRuleRequestBodyType,
  UpdateDiscountRuleResponseType,
} from 'src/_types/reality/admin/discountRules';

type UpdateDiscountRuleMutationParams = {
  id: number;
  data: UpdateDiscountRuleRequestBodyType;
};

export function useUpdateDiscountRuleMutation(
  options?: UseMutationOptions<
    UpdateDiscountRuleResponseType,
    ErrorResponse,
    UpdateDiscountRuleMutationParams
  >
) {
  return useMutation<
    UpdateDiscountRuleResponseType,
    ErrorResponse,
    UpdateDiscountRuleMutationParams
  >(({ id, data }: UpdateDiscountRuleMutationParams) => UpdateDiscountRule(id, data), options);
}
