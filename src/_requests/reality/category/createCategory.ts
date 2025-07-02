import { AxiosResponse } from 'axios';
import {
  CreateCategoryRequestBodyType,
  CreateCategoryResponseType,
} from 'src/_types/reality/category/createCategory';
import { reality } from 'src/_clients';

export default async function CreateCategory(
  data: CreateCategoryRequestBodyType
): Promise<CreateCategoryResponseType> {
  const response = await reality.post<
    CreateCategoryRequestBodyType,
    AxiosResponse<CreateCategoryResponseType>
  >(`/api/v1/categories`, data);

  return response.data;
}
