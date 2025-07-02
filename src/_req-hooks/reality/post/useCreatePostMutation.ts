// useCreatePostMutation.ts

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreatePost } from 'src/_requests/reality/post';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreatePostRequestBodyType,
  CreatePostResponseType,
} from 'src/_types/reality/post/createPost';

export function useCreatePostMutation(
  options?: UseMutationOptions<CreatePostResponseType, ErrorResponse, CreatePostRequestBodyType>
) {
  return useMutation<CreatePostResponseType, ErrorResponse, CreatePostRequestBodyType>(
    (data: CreatePostRequestBodyType) => CreatePost(data),
    options
  );
}
