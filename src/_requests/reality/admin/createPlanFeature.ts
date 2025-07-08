// src/_requests/reality/admin/createPlanFeature.ts

import { AxiosResponse } from 'axios';
import {
  CreatePlanFeatureRequestBodyType,
  CreatePlanFeatureResponseType,
} from 'src/_types/reality/admin/planFeatures';
import { reality } from 'src/_clients';

export default async function CreatePlanFeature(
  data: CreatePlanFeatureRequestBodyType
): Promise<CreatePlanFeatureResponseType> {
  const response = await reality.post<
    CreatePlanFeatureRequestBodyType,
    AxiosResponse<CreatePlanFeatureResponseType>
  >(`/api/v1/admin/plan-features`, data);

  return response.data;
}
