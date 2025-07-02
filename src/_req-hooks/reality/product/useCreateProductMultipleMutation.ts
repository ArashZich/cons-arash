// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateProductMultiple } from 'src/_requests/reality/product';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { CreateProductRequestBodyType } from 'src/_types/reality/product/createProduct';
import { CreateProductMultipleResponseType } from 'src/_types/reality/product/createProductMultiple';

export function useCreateProductMultipleMutation(
  options?: UseMutationOptions<
    CreateProductMultipleResponseType,
    ErrorResponse,
    CreateProductRequestBodyType[]
  >
) {
  return useMutation<
    CreateProductMultipleResponseType,
    ErrorResponse,
    CreateProductRequestBodyType[]
  >((data: CreateProductRequestBodyType[]) => CreateProductMultiple(data), options);
}
