import { AxiosResponse } from 'axios';
import { CreateProductRequestBodyType } from 'src/_types/reality/product/createProduct';
import { CreateProductMultipleResponseType } from 'src/_types/reality/product/createProductMultiple';
import { reality } from 'src/_clients';

export default async function CreateProductMultiple(
  data: CreateProductRequestBodyType[]
): Promise<CreateProductMultipleResponseType> {
  const response = await reality.post<
    CreateProductRequestBodyType[],
    AxiosResponse<CreateProductMultipleResponseType>
  >(`/api/v1/products/multiple`, data);

  return response.data;
}
