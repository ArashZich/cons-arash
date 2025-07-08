// src/_requests/reality/admin/createCategoryPricing.ts

import { AxiosResponse } from 'axios';
import {
  CreateCategoryPricingRequestBodyType,
  CreateCategoryPricingResponseType,
} from 'src/_types/reality/admin/categoryPricing';
import { reality } from 'src/_clients';

export default async function CreateCategoryPricing(
  data: CreateCategoryPricingRequestBodyType
): Promise<CreateCategoryPricingResponseType> {
  const response = await reality.post<
    CreateCategoryPricingRequestBodyType,
    AxiosResponse<CreateCategoryPricingResponseType>
  >(`/api/v1/admin/category-pricing`, data);

  return response.data;
}
