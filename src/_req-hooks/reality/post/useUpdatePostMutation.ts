// useUpdatePostMutation.ts
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import {
  UpdatePostRequestBodyType,
  UpdatePostResponseType,
} from 'src/_types/reality/post/updatePost';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { UpdatePost } from 'src/_requests/reality/post';

export function useUpdatePostMutation(
  options?: UseMutationOptions<UpdatePostResponseType, ErrorResponse, UpdatePostRequestBodyType>
) {
  return useMutation<UpdatePostResponseType, ErrorResponse, UpdatePostRequestBodyType>(
    (data: UpdatePostRequestBodyType) => UpdatePost(data),
    options
  );
}
