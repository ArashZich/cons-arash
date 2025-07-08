// src/_requests/reality/admin/getPlanFeatures.ts

import { AxiosResponse } from 'axios';
import {
  GetPlanFeaturesResponseType,
  GetPlanFeatureResponseType,
} from 'src/_types/reality/admin/planFeatures';
import { reality } from 'src/_clients';

export async function GetPlanFeatures(): Promise<GetPlanFeaturesResponseType> {
  const response = await reality.get<void, AxiosResponse<GetPlanFeaturesResponseType>>(
    '/api/v1/admin/plan-features'
  );

  return response.data;
}

export async function GetPlanFeature(id: number): Promise<GetPlanFeatureResponseType> {
  const response = await reality.get<void, AxiosResponse<GetPlanFeatureResponseType>>(
    `/api/v1/admin/plan-features/${id}`
  );

  return response.data;
}
