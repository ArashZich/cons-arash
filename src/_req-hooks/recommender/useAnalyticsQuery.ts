/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetAnalytics } from 'src/_requests/recommender/getAnalytics';
import { PeriodType, AnalyticsResponse } from 'src/_types/recommender/analytics';

type AnalyticsQueryParamsType = {
  period?: PeriodType;
  organization_uid?: string;
  page?: number;
  per_page?: number;
};

export function useAnalyticsQuery(
  queryFnArgs: AnalyticsQueryParamsType,
  options?: UseQueryOptions<AnalyticsResponse, ErrorResponse>
) {
  const queryKey = ['getRecommenderAnalyticsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<AnalyticsResponse, ErrorResponse>(
    queryKey,
    async (): Promise<AnalyticsResponse> =>
      GetAnalytics(
        queryFnArgs.period || 'week',
        queryFnArgs.organization_uid || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 1000
      ),
    options
  );
}
