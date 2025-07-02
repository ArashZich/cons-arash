import { AxiosResponse } from 'axios';
import {
  GetAllPermissionsReturnType,
  // GetRealityPermissionsResponseDataType,
} from 'src/_types/site/permissions';
import { reality } from 'src/_clients';

export async function getAllPermissions(): Promise<GetAllPermissionsReturnType> {
  const realityPermissionsResult = await reality.get<void, AxiosResponse>(
    '/api/v1/permissions/domains-access'
  );
  const { data: realityPermissions } = realityPermissionsResult;

  // Merging all the permissions data
  const allPermissions: GetAllPermissionsReturnType = await Promise.all([realityPermissions]).then(
    (permissions) => ({
      ...permissions[0].data,
    })
  );

  return allPermissions;
}
