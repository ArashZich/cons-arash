import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PostQueryFiltersType, QueryPostResponseType } from 'src/_types/reality/post/queryPosts';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryPosts } from 'src/_requests/reality/post';

type PostsQueryParamsType = {
  id?: any;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: PostQueryFiltersType;
};

export function usePostsQuery(
  queryFnArgs: PostsQueryParamsType,
  options?: UseQueryOptions<QueryPostResponseType, ErrorResponse>
) {
  const queryKey = ['getAllPostsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryPostResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryPostResponseType> =>
      QueryPosts(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10, // مقدار به 1 تغییر کرده برای تست
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as PostQueryFiltersType)
      ),
    options
  );
}
