import { AxiosResponse } from 'axios';
import { GetUserSingleResponseType } from 'src/_types/reality/user/getUser';
import { reality } from 'src/_clients';

export default async function GetUser(
  id: string
  // filter?: GetAllDocumentsFilterType
): Promise<GetUserSingleResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<GetUserSingleResponseType>>(
    `/api/v1/users/${id}`
  );

  return response.data;
}
