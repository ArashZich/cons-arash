// getCarpetInsights.ts
import { AxiosResponse } from 'axios';
import { CarpetInsightsResponse } from 'src/_types/recommender/carpetInsights';
import { recommender } from 'src/_clients';

export async function GetCarpetInsights(
  organization_uid: string,
  days: number = 30,
  limit: number = 1000
): Promise<CarpetInsightsResponse> {
  const response = await recommender.get<void, AxiosResponse<CarpetInsightsResponse>>(
    `/api/v1/carpet-insights/${organization_uid}`,
    {
      params: {
        days,
        limit,
      },
    }
  );

  return response.data;
}
