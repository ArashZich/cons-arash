// updatePublishedPost.ts
import { AxiosResponse } from 'axios';
import {
  UpdatePublishedRequestBodyType,
  UpdatePostResponseType,
} from 'src/_types/reality/post/updatePost';
import { reality } from 'src/_clients';

export default async function UpdatePublishedPost({
  post,
  ID,
}: UpdatePublishedRequestBodyType): Promise<UpdatePostResponseType> {
  const response = await reality.put<
    UpdatePublishedRequestBodyType,
    AxiosResponse<UpdatePostResponseType>
  >(`/api/v1/posts/${ID}/published`, post);

  return response.data;
}
