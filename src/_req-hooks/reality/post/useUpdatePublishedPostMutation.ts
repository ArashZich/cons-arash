// useUpdatePostMutation.ts
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import {
  UpdatePublishedRequestBodyType,
  UpdatePostResponseType,
} from 'src/_types/reality/post/updatePost';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { UpdatePublishedPost } from 'src/_requests/reality/post';

export function useUpdatePublishedPostMutation(
  options?: UseMutationOptions<
    UpdatePostResponseType,
    ErrorResponse,
    UpdatePublishedRequestBodyType
  >
) {
  return useMutation<UpdatePostResponseType, ErrorResponse, UpdatePublishedRequestBodyType>(
    (data: UpdatePublishedRequestBodyType) => UpdatePublishedPost(data),
    options
  );
}
