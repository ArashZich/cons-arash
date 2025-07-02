import { AxiosResponse } from 'axios';
import {
  PackagesQueryFiltersType,
  QueryPackagesResponseType,
} from 'src/_types/reality/package/queryPackages';
import { reality } from 'src/_clients';

export default async function QueryPackages(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: PackagesQueryFiltersType
): Promise<QueryPackagesResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryPackagesResponseType>>(
    '/api/v1/packages',
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
