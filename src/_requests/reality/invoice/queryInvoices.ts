import { AxiosResponse } from 'axios';
import {
  InvoicesQueryFiltersType,
  QueryInvoicesResponseType,
} from 'src/_types/reality/invoice/queryInvoices';
import { reality } from 'src/_clients';

export default async function QueryInvoices(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: InvoicesQueryFiltersType
): Promise<QueryInvoicesResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryInvoicesResponseType>>(
    '/api/v1/invoices',
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
