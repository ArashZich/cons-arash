/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import ExportViews, { ExportViewsRequest } from 'src/_requests/reality/view/exportViews';

export function useViewsExport(
  options?: UseMutationOptions<Blob, ErrorResponse, ExportViewsRequest>
) {
  return useMutation<Blob, ErrorResponse, ExportViewsRequest>({
    mutationFn: (request) => ExportViews(request),
    ...options,
  });
}
