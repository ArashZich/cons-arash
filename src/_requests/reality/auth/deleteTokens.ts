import { AxiosResponse } from 'axios';
import {
  DeleteTokensRequestBodyType,
  DeleteTokensResponseType,
} from 'src/_types/reality/auth/deleteTokens';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function DeleteTokens(data: DeleteTokensRequestBodyType) {
  const response = await reality.delete<
    DeleteTokensRequestBodyType,
    AxiosResponse<DeleteTokensResponseType>
  >('/v1/tokens', {
    data,
  });

  return response.data;
}
