// src/_requests/reality/admin/createDiscountRule.ts

import { AxiosResponse } from 'axios';
import {
  CreateDiscountRuleRequestBodyType,
  CreateDiscountRuleResponseType,
} from 'src/_types/reality/admin/discountRules';
import { reality } from 'src/_clients';

export default async function CreateDiscountRule(
  data: CreateDiscountRuleRequestBodyType
): Promise<CreateDiscountRuleResponseType> {
  const response = await reality.post<
    CreateDiscountRuleRequestBodyType,
    AxiosResponse<CreateDiscountRuleResponseType>
  >(`/api/v1/admin/discount-rules`, data);

  return response.data;
}
