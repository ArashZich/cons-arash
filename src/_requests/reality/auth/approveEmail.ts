import { AxiosResponse } from 'axios';
import {
  ApproveEmailRequestBodyType,
  ApproveEmailResponseType,
} from 'src/_types/reality/auth/approveEmail';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function ApproveEmail({
  code,
}: ApproveEmailRequestBodyType): Promise<ApproveEmailResponseType> {
  const response = await reality.post<
    ApproveEmailRequestBodyType,
    AxiosResponse<ApproveEmailResponseType>
  >(`/api/v1/accounts/approve-email/${code}`);

  return response.data;
}
