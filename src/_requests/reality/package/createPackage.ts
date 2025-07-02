import { AxiosResponse } from 'axios';
import {
  CreatePackageRequestBodyType,
  CreatePackageResponseType,
} from 'src/_types/reality/package/createPackage';
import { reality } from 'src/_clients';

export default async function CreatePackage(
  data: CreatePackageRequestBodyType
): Promise<CreatePackageResponseType> {
  const response = await reality.post<
    CreatePackageRequestBodyType,
    AxiosResponse<CreatePackageResponseType>
  >(`/api/v1/packages`, data);

  return response.data;
}
