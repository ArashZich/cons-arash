/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  PlansQueryFiltersType,
  QueryPlansResponseType as PlansQueryResponseType,
} from 'src/_types/reality/plan/queryPlans';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryPlans } from 'src/_requests/reality/plan';

type PlansQueryParamsType = {
  id?: any;
  page?: number;
  per_page?: number;
  query?: any;
  order?: string;
  order_by?: string;
  filters?: PlansQueryFiltersType;
};

export function usePlansQuery(
  queryFnArgs: PlansQueryParamsType,
  options?: UseQueryOptions<PlansQueryResponseType, ErrorResponse>
) {
  const queryKey = ['getAllPlansQuery', JSON.stringify(queryFnArgs)];

  return useQuery<PlansQueryResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<PlansQueryResponseType> =>
      QueryPlans(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10,
        queryFnArgs.query || '',
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as PlansQueryFiltersType)
      ),
    options
  );
}
