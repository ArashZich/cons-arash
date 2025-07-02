/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { DashboardResponseType } from 'src/_types/bytebase/dashboard';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetDashboard } from 'src/_requests/bytebase/file';

export function useDownloadQuery(options?: UseQueryOptions<DashboardResponseType, ErrorResponse>) {
  const queryKey = ['GetDashboardQuery'];

  return useQuery<DashboardResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<DashboardResponseType> => GetDashboard(),
    options
  );
}
