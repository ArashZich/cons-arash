import { AxiosResponse } from 'axios';
import {
  DeletePostsRequestBodyType,
  DeletePostsResponseType,
} from 'src/_types/reality/post/deletePosts';
import { reality } from 'src/_clients';

export default async function DeletePosts(
  data: DeletePostsRequestBodyType
): Promise<DeletePostsResponseType> {
  const response = await reality.delete<
    DeletePostsRequestBodyType,
    AxiosResponse<DeletePostsResponseType>
  >('/api/v1/posts', {
    data,
  });

  return response.data;
}
