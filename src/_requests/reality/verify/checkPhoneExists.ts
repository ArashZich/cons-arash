import { AxiosResponse } from 'axios';
import {
  CheckPhoneExistsRequestBodyType,
  CheckPhoneExistsResponseType,
} from 'src/_types/reality/verify/checkPhoneExists';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function CheckPhoneExists(
  data: CheckPhoneExistsRequestBodyType
): Promise<CheckPhoneExistsResponseType> {
  const response = await reality.post<
    CheckPhoneExistsRequestBodyType,
    AxiosResponse<CheckPhoneExistsResponseType>
  >('/api/v1/verifications/phone/check', data);

  return response.data;
}
