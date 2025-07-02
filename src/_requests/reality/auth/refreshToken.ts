// eslint-disable-next-line import/no-cycle
import { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-cycle
import { realityNoRefresh } from 'src/_clients/reality';
import {
  RefreshTokenRequestBodyType,
  RefreshTokensResponseType,
} from 'src/_types/reality/auth/refreshToken';

export default async function RefreshToken({ refresh_token }: RefreshTokenRequestBodyType) {
  const response = await realityNoRefresh.post<
    RefreshTokenRequestBodyType,
    AxiosResponse<RefreshTokensResponseType>
  >(`/api/v1/tokens/refresh`, {
    refresh_token,
  });

  return response.data;
}
