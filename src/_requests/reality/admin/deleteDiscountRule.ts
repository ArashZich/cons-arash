// src/_requests/reality/admin/deleteDiscountRule.ts

import { AxiosResponse } from 'axios';
import { DeleteDiscountRuleResponseType } from 'src/_types/reality/admin/discountRules';
import { reality } from 'src/_clients';

export default async function DeleteDiscountRule(
  id: number
): Promise<DeleteDiscountRuleResponseType> {
  const response = await reality.delete<void, AxiosResponse<DeleteDiscountRuleResponseType>>(
    `/api/v1/admin/discount-rules/${id}`
  );

  return response.data;
}
