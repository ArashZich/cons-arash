/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetAllExpertsResponseType } from 'src/_types/reality/user/getAllExperts';
import { GetAllExperts } from 'src/_requests/reality/user';

type getAllExpertsType = {
  // filters: NursesQueryAbsencesFilterType;
};

export function useGetAllExpertsQuery(
  queryFnArgs: getAllExpertsType,
  options?: UseQueryOptions<GetAllExpertsResponseType, ErrorResponse>
) {
  const queryKey = ['getAllExpertsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<GetAllExpertsResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetAllExpertsResponseType> => GetAllExperts(),
    options
  );
}
