import { AxiosResponse } from 'axios';
import { SendCodeRequestBodyType, SendCodeResponseType } from 'src/_types/reality/verify/sendCode';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function SendCode(
  data: SendCodeRequestBodyType
): Promise<SendCodeResponseType> {
  const response = await reality.post<SendCodeRequestBodyType, AxiosResponse<SendCodeResponseType>>(
    '/api/v1/verifications/send',
    data
  );

  return response.data;
}
