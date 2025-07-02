// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import DeleteProduct from 'src/_requests/reality/product/deleteProduct';
import { DeleteProductsRequestBodyData, DeleteProductsResponseData } from 'src/_types/reality/product/deleteProduct';

export function useDeleteProductMutation(
    options?: UseMutationOptions<
        DeleteProductsResponseData,
        ErrorResponse,
        DeleteProductsRequestBodyData
    >
) {
    return useMutation<DeleteProductsResponseData, ErrorResponse, DeleteProductsRequestBodyData>(
        (data: DeleteProductsRequestBodyData) => DeleteProduct(data),
        options
    );
}
