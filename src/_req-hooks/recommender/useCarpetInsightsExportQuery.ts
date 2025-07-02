// useCarpetInsightsExportQuery.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetCarpetInsightsExport } from 'src/_requests/recommender/getCarpetInsightsExport';

type CarpetInsightsExportQueryParamsType = {
  organization_uid?: string;
  days?: number;
  limit?: number;
};

export function useCarpetInsightsExportQuery(
  queryFnArgs: CarpetInsightsExportQueryParamsType,
  options?: UseQueryOptions<Blob, ErrorResponse>
) {
  const queryKey = ['getRecommenderCarpetInsightsExportQuery', JSON.stringify(queryFnArgs)];

  return useQuery<Blob, ErrorResponse>(
    queryKey,
    async (): Promise<Blob> =>
      GetCarpetInsightsExport(
        queryFnArgs.organization_uid || '',
        queryFnArgs.days || 30,
        queryFnArgs.limit || 10000
      ),
    {
      ...options,
      enabled: !!queryFnArgs.organization_uid,
    }
  );
}
