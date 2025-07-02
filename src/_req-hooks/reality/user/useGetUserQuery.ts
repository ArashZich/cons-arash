/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetUserSingleResponseType } from 'src/_types/reality/user/getUser';
import { GetUser } from 'src/_requests/reality/user';

type getUserType = {
  id: string;
  // filters: NursesQueryAbsencesFilterType;
};

export function useGetUserQuery(
  queryFnArgs: getUserType,
  options?: UseQueryOptions<GetUserSingleResponseType, ErrorResponse>
) {
  const queryKey = ['getUserQuery', JSON.stringify(queryFnArgs.id)];

  return useQuery<GetUserSingleResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetUserSingleResponseType> => GetUser(queryFnArgs.id),
    options
  );
}
