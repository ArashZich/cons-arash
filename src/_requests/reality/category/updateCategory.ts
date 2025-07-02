import { AxiosResponse } from 'axios';
import {
  UpdateCategoryRequestBodyType,
  UpdateCategoryResponseType,
} from 'src/_types/reality/category/updateCategory';
import { reality } from 'src/_clients';

export default async function UpdateCategory({
  category,
  ID,
}: UpdateCategoryRequestBodyType): Promise<UpdateCategoryResponseType> {
  const response = await reality.put<
    UpdateCategoryRequestBodyType,
    AxiosResponse<UpdateCategoryResponseType>
  >(`/api/v1/categories/${ID}`, category);

  return response.data;
}
