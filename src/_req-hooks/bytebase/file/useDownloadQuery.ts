/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { DownloadResponseType } from 'src/_types/bytebase/download';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { Download } from 'src/_requests/bytebase/file';

type DownloadQueryType = {
  key: string;
};

export function useDownloadQuery(
  queryFnArgs: DownloadQueryType,
  options?: UseQueryOptions<DownloadResponseType, ErrorResponse>
) {
  const queryKey = ['DownloadQuery', JSON.stringify(queryFnArgs)];

  return useQuery<DownloadResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<DownloadResponseType> => Download(queryFnArgs.key),
    options
  );
}
