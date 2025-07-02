import { AxiosResponse } from 'axios';
import {
  CreateProductRequestBodyType,
  CreateProductResponseType,
} from 'src/_types/reality/product/createProduct';
import { reality } from 'src/_clients';

export default async function CreateProduct(
  data: CreateProductRequestBodyType
): Promise<CreateProductResponseType> {
  const response = await reality.post<
    CreateProductRequestBodyType,
    AxiosResponse<CreateProductResponseType>
  >(`/api/v1/products`, data);

  return response.data;
}
