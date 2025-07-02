import { AxiosResponse } from 'axios';
import {
  ProductsQueryFiltersType,
  QueryProductsResponseType,
} from 'src/_types/reality/product/queryProducts';
import { reality } from 'src/_clients';

export default async function QueryProducts(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: ProductsQueryFiltersType
): Promise<QueryProductsResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryProductsResponseType>>(
    '/api/v1/products',
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
