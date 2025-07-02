import { AxiosResponse } from 'axios';
import {
  CreatePostRequestBodyType,
  CreatePostResponseType,
} from 'src/_types/reality/post/createPost';
import { reality } from 'src/_clients';

export default async function createPost(
  data: CreatePostRequestBodyType
): Promise<CreatePostResponseType> {
  const response = await reality.post<
    CreatePostRequestBodyType,
    AxiosResponse<CreatePostResponseType>
  >(`/api/v1/posts`, data);

  return response.data;
}
