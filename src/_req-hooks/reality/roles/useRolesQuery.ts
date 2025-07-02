/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryRolesResponseType } from 'src/_types/reality/role/roleData';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetRoles } from 'src/_requests/reality/role/getRoles';

export function useRolesQuery(
  queryFnArgs: any,
  options?: UseQueryOptions<QueryRolesResponseType, ErrorResponse>
) {
  const queryKey = ['getAllRolesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryRolesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryRolesResponseType> => GetRoles(),
    options
  );
}
