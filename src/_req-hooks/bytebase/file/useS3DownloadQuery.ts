/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import S3Download from 'src/_requests/bytebase/file/s3Download';
import { S3DownloadResponseType } from 'src/_types/bytebase/s3download';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';

type S3DownloadQueryType = {
  key: string;
};

export function useS3DownloadQuery(
  queryFnArgs: S3DownloadQueryType,
  options?: UseQueryOptions<S3DownloadResponseType, ErrorResponse>
) {
  const queryKey = ['S3DownloadQuery', JSON.stringify(queryFnArgs)];

  return useQuery<S3DownloadResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<S3DownloadResponseType> => S3Download(queryFnArgs.key),
    options
  );
}
