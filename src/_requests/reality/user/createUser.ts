import { AxiosResponse } from 'axios';
import {
  CreateUserRequestBodyType,
  CreateUserResponseType,
} from 'src/_types/reality/user/createUser';
import { reality } from 'src/_clients';

export default async function CreateUser(
  user: CreateUserRequestBodyType
): Promise<CreateUserResponseType> {
  const response = await reality.post<
    CreateUserRequestBodyType,
    AxiosResponse<CreateUserResponseType>
  >(`/api/v1/users`, user);

  return response.data;
}
