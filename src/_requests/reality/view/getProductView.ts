import { AxiosResponse } from 'axios';
import {
  GetProductViewQueryFiltersType,
  GetProductViewResponseType,
} from 'src/_types/reality/view/getProductView';
import { reality } from 'src/_clients';

export default async function GetProductView(
  id: any,
  page: number,
  per_page: number,
  query: any,
  order: string,
  order_by: string,
  filters: GetProductViewQueryFiltersType
): Promise<GetProductViewResponseType> {
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<GetProductViewResponseType>>(
    '/api/v1/product-view',
    {
      params: {
        id,
        page,
        per_page,
        query,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
