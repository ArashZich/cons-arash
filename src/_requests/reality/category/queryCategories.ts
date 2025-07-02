import { AxiosResponse } from 'axios';
import {
  CategoriesQueryFiltersType,
  QueryCategoriesResponseType,
} from 'src/_types/reality/category/queryCategories';
import { reality } from 'src/_clients';

export default async function QueryCategories(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: CategoriesQueryFiltersType
): Promise<QueryCategoriesResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryCategoriesResponseType>>(
    '/api/v1/categories',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
