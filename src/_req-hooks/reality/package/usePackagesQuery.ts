/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  PackagesQueryFiltersType,
  QueryPackagesResponseType as PackagesQueryResponseType,
} from 'src/_types/reality/package/queryPackages';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryPackages } from 'src/_requests/reality/package';

type PackagesQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: PackagesQueryFiltersType;
};

export function usePackagesQuery(
  queryFnArgs: PackagesQueryParamsType,
  options?: UseQueryOptions<PackagesQueryResponseType, ErrorResponse>
) {
  const queryKey = ['getAllPackagesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<PackagesQueryResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<PackagesQueryResponseType> =>
      QueryPackages(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as PackagesQueryFiltersType)
      ),
    options
  );
}
