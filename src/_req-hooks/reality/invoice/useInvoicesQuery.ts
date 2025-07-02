/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  InvoicesQueryFiltersType,
  QueryInvoicesResponseType,
} from 'src/_types/reality/invoice/queryInvoices';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryInvoices } from 'src/_requests/reality/invoice';

type QueryInvoicesParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: InvoicesQueryFiltersType;
};

export function useInvoicesQuery(
  queryFnArgs: QueryInvoicesParamsType,
  options?: UseQueryOptions<QueryInvoicesResponseType, ErrorResponse>
) {
  const queryKey = ['getAllInvoicesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryInvoicesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryInvoicesResponseType> =>
      QueryInvoices(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as InvoicesQueryFiltersType)
      ),
    options
  );
}
