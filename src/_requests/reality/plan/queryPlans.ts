import { AxiosResponse } from 'axios';
import { PlansQueryFiltersType, QueryPlansResponseType } from 'src/_types/reality/plan/queryPlans';
import { reality } from 'src/_clients';

export default async function QueryPlans(
  id: any,
  page: number,
  per_page: number,
  query: any,
  order: string,
  order_by: string,
  filters: PlansQueryFiltersType
): Promise<QueryPlansResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryPlansResponseType>>('/api/v1/plans', {
    params: {
      id,
      page,
      per_page,
      query,
      order,
      order_by,
      filters: JSON.stringify(filters),
    },
  });

  return response.data;
}
