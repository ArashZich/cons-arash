// src/_requests/reality/admin/updateDiscountRule.ts

import { AxiosResponse } from 'axios';
import {
  UpdateDiscountRuleRequestBodyType,
  UpdateDiscountRuleResponseType,
} from 'src/_types/reality/admin/discountRules';
import { reality } from 'src/_clients';

export default async function UpdateDiscountRule(
  id: number,
  data: UpdateDiscountRuleRequestBodyType
): Promise<UpdateDiscountRuleResponseType> {
  const response = await reality.put<
    UpdateDiscountRuleRequestBodyType,
    AxiosResponse<UpdateDiscountRuleResponseType>
  >(`/api/v1/admin/discount-rules/${id}`, data);

  return response.data;
}
