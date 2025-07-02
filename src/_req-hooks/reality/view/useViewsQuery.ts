/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryViewsResponseType, ViewQueryFiltersType } from 'src/_types/reality/view/queryViews';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryViews } from 'src/_requests/reality/view';

type PlansQueryParamsType = {
  id?: any;
  page?: number;
  per_page?: number;
  query?: any;
  order?: string;
  order_by?: string;
  duration?: 'one_week' | 'one_month' | 'three_months' | 'six_months' | 'one_year';
  filters?: ViewQueryFiltersType;
};

export function useViewsQuery(
  queryFnArgs: PlansQueryParamsType,
  options?: UseQueryOptions<QueryViewsResponseType, ErrorResponse>
) {
  const queryKey = ['getAllViewsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryViewsResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryViewsResponseType> =>
      QueryViews(
        queryFnArgs.id || '',
        queryFnArgs.page || 0,
        queryFnArgs.per_page || 1000,
        queryFnArgs.query || '',
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.duration || 'one_week',
        queryFnArgs.filters || ({} as ViewQueryFiltersType)
      ),
    options
  );
}
