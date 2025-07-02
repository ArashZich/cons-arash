// useUpdatePostMutation.ts
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import {
  UpdateViewsRequestBodyType,
  UpdatePostResponseType,
} from 'src/_types/reality/post/updatePost';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { UpdateViewsPost } from 'src/_requests/reality/post';

export function useUpdateViewsPostMutation(
  options?: UseMutationOptions<UpdatePostResponseType, ErrorResponse, UpdateViewsRequestBodyType>
) {
  return useMutation<UpdatePostResponseType, ErrorResponse, UpdateViewsRequestBodyType>(
    (data: UpdateViewsRequestBodyType) => UpdateViewsPost(data),
    options
  );
}
