import { AxiosResponse } from 'axios';
import { PostQueryFiltersType, QueryPostResponseType } from 'src/_types/reality/post/queryPosts';
import { reality } from 'src/_clients';

export default async function QueryPosts(
  id: any,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: PostQueryFiltersType
): Promise<QueryPostResponseType> {
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryPostResponseType>>('/api/v1/posts', {
    params: {
      id,
      page,
      per_page,
      order,
      order_by,
      filters: JSON.stringify(filters),
    },
  });

  return response.data;
}
