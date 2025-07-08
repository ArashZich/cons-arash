// src/_requests/reality/admin/getDiscountRules.ts

import { AxiosResponse } from 'axios';
import {
  GetDiscountRulesResponseType,
  GetDiscountRuleResponseType,
} from 'src/_types/reality/admin/discountRules';
import { reality } from 'src/_clients';

export async function GetDiscountRules(): Promise<GetDiscountRulesResponseType> {
  const response = await reality.get<void, AxiosResponse<GetDiscountRulesResponseType>>(
    '/api/v1/admin/discount-rules'
  );

  return response.data;
}

export async function GetDiscountRule(id: number): Promise<GetDiscountRuleResponseType> {
  const response = await reality.get<void, AxiosResponse<GetDiscountRuleResponseType>>(
    `/api/v1/admin/discount-rules/${id}`
  );

  return response.data;
}
