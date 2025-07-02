// useCarpetInsightsQuery.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetCarpetInsights } from 'src/_requests/recommender/getCarpetInsights';
import { CarpetInsightsResponse } from 'src/_types/recommender/carpetInsights';

type CarpetInsightsQueryParamsType = {
  organization_uid?: string;
  days?: number;
  limit?: number;
};

export function useCarpetInsightsQuery(
  queryFnArgs: CarpetInsightsQueryParamsType,
  options?: UseQueryOptions<CarpetInsightsResponse, ErrorResponse>
) {
  const queryKey = ['getRecommenderCarpetInsightsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<CarpetInsightsResponse, ErrorResponse>(
    queryKey,
    async (): Promise<CarpetInsightsResponse> =>
      GetCarpetInsights(
        queryFnArgs.organization_uid || '',
        queryFnArgs.days || 30,
        queryFnArgs.limit || 1000
      ),
    {
      ...options,
      enabled: !!queryFnArgs.organization_uid,
    }
  );
}
