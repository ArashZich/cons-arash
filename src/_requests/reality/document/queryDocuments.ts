import { AxiosResponse } from 'axios';
import {
  DocumentsQueryFiltersType,
  QueryDocumentsResponseType,
} from 'src/_types/reality/document/queryDocuments';
import { reality } from 'src/_clients';

export default async function QueryDocuments(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: DocumentsQueryFiltersType
): Promise<QueryDocumentsResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryDocumentsResponseType>>(
    '/api/v1/documents',
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
