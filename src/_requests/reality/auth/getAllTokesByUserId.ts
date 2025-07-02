import { AxiosResponse } from 'axios';
import { GetAllTokesByUserIdResponseTyp } from 'src/_types/reality/auth/getAllTokesByUserId';
// eslint-disable-next-line import/no-cycle
import { reality } from 'src/_clients';

export default async function GetAllTokensByUserId(
  userID: string
): Promise<GetAllTokesByUserIdResponseTyp> {
  const response = await reality.get<void, AxiosResponse<GetAllTokesByUserIdResponseTyp>>(
    `/v1/tokens/${userID}`
  );

  return response.data;
}
