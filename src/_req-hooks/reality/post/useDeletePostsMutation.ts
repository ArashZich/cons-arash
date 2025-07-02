// useDeletePostsMutation.ts
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeletePosts } from 'src/_requests/reality/post';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  DeletePostsRequestBodyType,
  DeletePostsResponseType,
} from 'src/_types/reality/post/deletePosts';

export function useDeletePostsMutation(
  options?: UseMutationOptions<DeletePostsResponseType, ErrorResponse, DeletePostsRequestBodyType>
) {
  return useMutation<DeletePostsResponseType, ErrorResponse, DeletePostsRequestBodyType>(
    DeletePosts,
    options
  );
}
