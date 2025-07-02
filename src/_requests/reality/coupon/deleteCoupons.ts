import { AxiosResponse } from 'axios';
import {
  DeleteCouponsRequestBodyData,
  DeleteCouponsResponseData,
} from 'src/_types/reality/coupon/deleteCoupons';
import { reality } from 'src/_clients';

export default async function DeleteCoupons(
  ids: DeleteCouponsRequestBodyData
): Promise<DeleteCouponsResponseData> {
  const response = await reality.delete<
    DeleteCouponsRequestBodyData,
    AxiosResponse<DeleteCouponsResponseData>
  >('/api/v1/coupons', {
    data: ids,
  });

  return response.data;
}
