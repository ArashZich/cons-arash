/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  GetProductViewResponseType,
  GetProductViewQueryFiltersType,
} from 'src/_types/reality/view/getProductView';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetProductView } from 'src/_requests/reality/view';

type PlansQueryParamsType = {
  id?: any;
  page?: number;
  per_page?: number;
  query?: any;
  order?: string;
  order_by?: string;
  filters?: GetProductViewQueryFiltersType;
};

export function useGetProductViewQuery(
  queryFnArgs: PlansQueryParamsType,
  options?: UseQueryOptions<GetProductViewResponseType, ErrorResponse>
) {
  const queryKey = ['getProductViewQuery', JSON.stringify(queryFnArgs)];

  return useQuery<GetProductViewResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetProductViewResponseType> =>
      GetProductView(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 5,
        queryFnArgs.query || '',
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as GetProductViewQueryFiltersType)
      ),
    options
  );
}
