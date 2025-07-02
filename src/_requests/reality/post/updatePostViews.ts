// updatePublishedPost.ts
import { AxiosResponse } from 'axios';
import {
  UpdateViewsRequestBodyType,
  UpdatePostResponseType,
} from 'src/_types/reality/post/updatePost';
import { reality } from 'src/_clients';

export default async function UpdateViewsPost({
  post,
  ID,
}: UpdateViewsRequestBodyType): Promise<UpdatePostResponseType> {
  const response = await reality.put<
    UpdateViewsRequestBodyType,
    AxiosResponse<UpdatePostResponseType>
  >(`/api/v1/posts/${ID}/views`, post);

  return response.data;
}
