/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  DocumentsQueryFiltersType,
  QueryDocumentsResponseType as DocumentsQueryResponseType,
} from 'src/_types/reality/document/queryDocuments';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryDocument } from 'src/_requests/reality/document';

type DocumentsQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: DocumentsQueryFiltersType;
};

export function useDocumentsQuery(
  queryFnArgs: DocumentsQueryParamsType,
  options?: UseQueryOptions<DocumentsQueryResponseType, ErrorResponse>
) {
  const queryKey = ['getAllDocumentsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<DocumentsQueryResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<DocumentsQueryResponseType> =>
      QueryDocument(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 1,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as DocumentsQueryFiltersType)
      ),
    options
  );
}
