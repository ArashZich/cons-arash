// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateProduct } from 'src/_requests/reality/product';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateProductRequestBodyType,
  CreateProductResponseType,
} from 'src/_types/reality/product/createProduct';

export function useCreateProductMutation(
  options?: UseMutationOptions<
    CreateProductResponseType,
    ErrorResponse,
    CreateProductRequestBodyType
  >
) {
  return useMutation<CreateProductResponseType, ErrorResponse, CreateProductRequestBodyType>(
    (data: CreateProductRequestBodyType) => CreateProduct(data),
    options
  );
}
