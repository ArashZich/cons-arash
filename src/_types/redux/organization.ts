import { OrganizationDataType } from 'src/_types/reality/organization/organizationData';
import { CreateOrganizationRequestBodyType } from '../reality/organization/createOrganization';

export type OrganizationState = {
  organization: OrganizationDataType | null;
  organizationInfo: CreateOrganizationRequestBodyType | null;
  planPurchase: string;
};

export type OrganizationChangedPayloadType = OrganizationDataType;
export type OrganizationInfoChangedPayloadType = CreateOrganizationRequestBodyType;
export type PlanPurchaseChangedPayloadType = string;
