// useAnalyticsExportQuery.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetAnalyticsExport } from 'src/_requests/recommender/getAnalyticsExport';
import { PeriodType } from 'src/_types/recommender/analytics';

type AnalyticsExportQueryParamsType = {
  period?: PeriodType;
  organization_uid?: string;
  format?: 'json' | 'csv';
};

export function useAnalyticsExportQuery(
  queryFnArgs: AnalyticsExportQueryParamsType,
  options?: UseQueryOptions<Blob, ErrorResponse>
) {
  const queryKey = ['getRecommenderAnalyticsExportQuery', JSON.stringify(queryFnArgs)];

  return useQuery<Blob, ErrorResponse>(
    queryKey,
    async (): Promise<Blob> =>
      GetAnalyticsExport(
        queryFnArgs.period || 'year',
        queryFnArgs.organization_uid || '',
        queryFnArgs.format || 'json'
      ),
    {
      ...options,
      enabled: !!queryFnArgs.period && !!queryFnArgs.organization_uid,
    }
  );
}
