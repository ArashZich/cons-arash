/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HostResponseType } from 'src/_types/bytebase/host';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetHost } from 'src/_requests/bytebase/file';

export function useGetHostQuery(options?: UseQueryOptions<HostResponseType, ErrorResponse>) {
  const queryKey = ['getHostQuery'];

  return useQuery<HostResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<HostResponseType> => GetHost(),
    options
  );
}
