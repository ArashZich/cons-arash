import { AxiosResponse } from 'axios';
import { QueryViewsResponseType, ViewQueryFiltersType } from 'src/_types/reality/view/queryViews';
import { reality } from 'src/_clients';

export default async function QueryViews(
  id: any,
  page: number,
  per_page: number,
  query: any,
  order: string,
  order_by: string,
  duration: 'one_week' | 'one_month' | 'three_months' | 'six_months' | 'one_year',
  filters: ViewQueryFiltersType
): Promise<QueryViewsResponseType> {
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryViewsResponseType>>('/api/v1/views', {
    params: {
      id,
      page,
      per_page,
      query,
      order,
      order_by,
      duration,
      filters: JSON.stringify(filters),
    },
  });

  return response.data;
}
