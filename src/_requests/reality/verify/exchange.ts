import { AxiosResponse } from 'axios';
import {
  ExchangeCodeRequestBodyType,
  ExchangeCodeResponseType,
} from 'src/_types/reality/verify/exchange';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function ExchangeCode(
  data: ExchangeCodeRequestBodyType
): Promise<ExchangeCodeResponseType> {
  const response = await reality.post<
    ExchangeCodeRequestBodyType,
    AxiosResponse<ExchangeCodeResponseType>
  >('/api/v1/verifications/exchange', data);

  return response.data;
}
