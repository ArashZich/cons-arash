import { AxiosResponse } from 'axios';
import { reality } from 'src/_clients';
import { DeleteProductsRequestBodyData, DeleteProductsResponseData } from 'src/_types/reality/product/deleteProduct';

export default async function DeleteProducts(
    ids: DeleteProductsRequestBodyData
): Promise<DeleteProductsResponseData> {
    const response = await reality.delete<
        DeleteProductsRequestBodyData,
        AxiosResponse<DeleteProductsResponseData>
    >('/api/v1/products', {
        data: ids,
    });

    return response.data;
}
