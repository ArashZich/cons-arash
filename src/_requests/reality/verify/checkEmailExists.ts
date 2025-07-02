import { AxiosResponse } from 'axios';
import {
  CheckEmailExistsRequestBodyType,
  CheckEmailExistsResponseType,
} from 'src/_types/reality/verify/checkEmailExists';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function CheckEmailExists(
  data: CheckEmailExistsRequestBodyType
): Promise<CheckEmailExistsResponseType> {
  const response = await reality.post<
    CheckEmailExistsRequestBodyType,
    AxiosResponse<CheckEmailExistsResponseType>
  >('/api/v1/verifications/email/check', data);

  return response.data;
}
