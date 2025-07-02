// src/_requests/reality/plan/queryByCategoryID.ts

import { AxiosResponse } from 'axios';
import { QueryByCategoryIDResponseType } from 'src/_types/reality/plan/queryByCategoryID';
import { reality } from 'src/_clients';

export default async function QueryByCategoryID(
  category_id: number
): Promise<QueryByCategoryIDResponseType> {
  const response = await reality.get<void, AxiosResponse<QueryByCategoryIDResponseType>>(
    '/api/v1/plans/by_category',
    {
      params: {
        category_id,
      },
    }
  );

  return response.data;
}
