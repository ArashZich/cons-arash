import { AxiosResponse } from 'axios';
import {
  ApprovePhoneRequestBodyType,
  ApprovePhoneResponseType,
} from 'src/_types/reality/auth/approvePhone';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function ApprovePhone({
  code,
}: ApprovePhoneRequestBodyType): Promise<ApprovePhoneResponseType> {
  const response = await reality.post<
    ApprovePhoneRequestBodyType,
    AxiosResponse<ApprovePhoneResponseType>
  >(`/api/v1/accounts/approve-phone/${code}`);

  return response.data;
}
