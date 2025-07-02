import { AxiosResponse } from 'axios';
import {
  DeleteOrganizationRequestBodyData,
  DeleteOrganizationResponseData,
} from 'src/_types/reality/organization/deleteOrganization';
import { reality } from 'src/_clients';

export default async function DeleteOrganization(
  ids: DeleteOrganizationRequestBodyData
): Promise<DeleteOrganizationResponseData> {
  const response = await reality.delete<
    DeleteOrganizationRequestBodyData,
    AxiosResponse<DeleteOrganizationResponseData>
  >('/api/v1/organizations', {
    data: ids,
  });

  return response.data;
}
