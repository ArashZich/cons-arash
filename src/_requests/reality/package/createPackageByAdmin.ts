import { AxiosResponse } from 'axios';
import {
  CreatePackageByAdminRequestBodyType,
  CreatePackageByAdminResponseType,
} from 'src/_types/reality/package/createPackageByAdmin';
import { reality } from 'src/_clients';

export default async function CreatePackageByAdmin(
  data: CreatePackageByAdminRequestBodyType
): Promise<CreatePackageByAdminResponseType> {
  const response = await reality.post<
    CreatePackageByAdminRequestBodyType,
    AxiosResponse<CreatePackageByAdminResponseType>
  >(`/api/v1/packages/admin`, data);

  return response.data;
}
