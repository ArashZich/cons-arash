/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  ProductsQueryFiltersType,
  QueryProductsResponseType as ProductsQueryResponseType,
} from 'src/_types/reality/product/queryProducts';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryProducts } from 'src/_requests/reality/product';

type ProductsQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: ProductsQueryFiltersType;
};

export function useProductsQuery(
  queryFnArgs: ProductsQueryParamsType,
  options?: UseQueryOptions<ProductsQueryResponseType, ErrorResponse>
) {
  const queryKey = ['getAllProductsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<ProductsQueryResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<ProductsQueryResponseType> =>
      QueryProducts(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'asc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as ProductsQueryFiltersType)
      ),
    options
  );
}
