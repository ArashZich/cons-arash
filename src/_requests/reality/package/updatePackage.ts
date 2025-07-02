import { AxiosResponse } from 'axios';
import {
  UpdatePackageRequestBodyType,
  UpdatePackageResponseType,
} from 'src/_types/reality/package/updatePackage';
import { reality } from 'src/_clients';

export default async function UpdatePackage({
  data,
  ID,
}: UpdatePackageRequestBodyType): Promise<UpdatePackageResponseType> {
  const response = await reality.put<
    UpdatePackageRequestBodyType,
    AxiosResponse<UpdatePackageResponseType>
  >(`/api/v1/packages/${ID}`, data);

  return response.data;
}
