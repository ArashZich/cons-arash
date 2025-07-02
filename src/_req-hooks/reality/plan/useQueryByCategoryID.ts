// src/hooks/useQueryByCategoryID.ts

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryByCategoryIDResponseType } from 'src/_types/reality/plan/queryByCategoryID';
import QueryByCategoryID from 'src/_requests/reality/plan/queryByCategoryID';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';

type QueryByCategoryIDParamsType = {
  category_id: number;
};

export function useQueryByCategoryID(
  queryFnArgs: QueryByCategoryIDParamsType,
  options?: UseQueryOptions<QueryByCategoryIDResponseType, ErrorResponse>
) {
  const queryKey = ['getPlansByCategoryID', queryFnArgs.category_id];

  return useQuery<QueryByCategoryIDResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryByCategoryIDResponseType> => QueryByCategoryID(queryFnArgs.category_id),
    options
  );
}
