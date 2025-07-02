import { AxiosResponse } from 'axios';
import {
  UpdatePostRequestBodyType,
  UpdatePostResponseType,
} from 'src/_types/reality/post/updatePost';
import { reality } from 'src/_clients';

export default async function UpdatePost({
  post,
  ID,
}: UpdatePostRequestBodyType): Promise<UpdatePostResponseType> {
  const response = await reality.put<
    UpdatePostRequestBodyType,
    AxiosResponse<UpdatePostResponseType>
  >(`/api/v1/posts/${ID}`, post);

  return response.data;
}
