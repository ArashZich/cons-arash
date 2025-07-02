import { AxiosResponse } from 'axios';
import {
  DeleteCategoriesRequestBodyData,
  DeleteCategoriesResponseData,
} from 'src/_types/reality/category/deleteCategories';
import { reality } from 'src/_clients';

export default async function DeleteCategories(
  ids: DeleteCategoriesRequestBodyData
): Promise<DeleteCategoriesResponseData> {
  const response = await reality.delete<
    DeleteCategoriesRequestBodyData,
    AxiosResponse<DeleteCategoriesResponseData>
  >('/api/v1/categories', {
    data: ids,
  });

  return response.data;
}
