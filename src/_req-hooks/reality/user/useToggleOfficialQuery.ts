/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { ToggleOfficialResponseType } from 'src/_types/reality/user/toggleSuspend';
import { ToggleOfficial } from 'src/_requests/reality/user';

type toggleOfficialType = {
  id: string;
  // filters: NursesQueryAbsencesFilterType;
};

export function useToggleOfficialQuery(
  queryFnArgs: toggleOfficialType,
  options?: UseQueryOptions<ToggleOfficialResponseType, ErrorResponse>
) {
  const queryKey = ['ToggleOfficialQuery', JSON.stringify(queryFnArgs.id)];

  return useQuery<ToggleOfficialResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<ToggleOfficialResponseType> => ToggleOfficial(queryFnArgs.id),
    options
  );
}
