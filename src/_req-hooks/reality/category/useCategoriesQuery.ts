/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  CategoriesQueryFiltersType,
  QueryCategoriesResponseType as CategoriesQueryResponseType,
} from 'src/_types/reality/category/queryCategories';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryCategories } from 'src/_requests/reality/category';

type CategoriesQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: CategoriesQueryFiltersType;
};

export function useCategoriesQuery(
  queryFnArgs: CategoriesQueryParamsType,
  options?: UseQueryOptions<CategoriesQueryResponseType, ErrorResponse>
) {
  const queryKey = ['getAllCategoriesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<CategoriesQueryResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<CategoriesQueryResponseType> =>
      QueryCategories(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'asc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as CategoriesQueryFiltersType)
      ),
    options
  );
}
