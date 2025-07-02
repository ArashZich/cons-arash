// getAnalytics.ts
import { AxiosResponse } from 'axios';
import { PeriodType, AnalyticsResponse } from 'src/_types/recommender/analytics';
import { recommender } from 'src/_clients';

export async function GetAnalytics(
  period: PeriodType,
  organization_uid: string,
  page: number,
  per_page: number
): Promise<AnalyticsResponse> {
  const response = await recommender.get<void, AxiosResponse<AnalyticsResponse>>(
    '/api/v1/analytics',
    {
      params: {
        period,
        organization_uid,
        page,
        per_page,
      },
    }
  );

  return response.data;
}
