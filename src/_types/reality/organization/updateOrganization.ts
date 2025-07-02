import { CreateOrganizationRequestBodyType } from './createOrganization';
import { OrganizationDataType } from './organizationData';

export type UpdateOrganizationRequestBodyType = {
  organization: CreateOrganizationRequestBodyType;
  ID?: number;
};

export type UpdateOrganizationResponseType = {
  statusCode: number;
  data: OrganizationDataType;
};
