import { AxiosResponse } from 'axios';
import {
  DeleteUsersResponseData,
  DeleteUsersRequestBodyData,
} from 'src/_types/reality/user/deleteUsers';
import { reality } from 'src/_clients';

export default async function DeleteUsers({
  ids,
}: DeleteUsersRequestBodyData): Promise<DeleteUsersResponseData> {
  const response = await reality.delete<
    DeleteUsersRequestBodyData,
    AxiosResponse<DeleteUsersResponseData>
  >('/api/v1/users', {
    data: ids,
  });

  return response.data;
}
