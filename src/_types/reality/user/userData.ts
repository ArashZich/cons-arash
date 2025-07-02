import { RoleData } from '../role/roleData';
import { OrganizationDataType } from '../organization/organizationData';

export interface UserData {
  ID: number;
  biography: string;
  rate: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  grade: number;
  id_code: string | null;
  password: string;
  last_name: string;
  username: string;
  nickname: string;
  avatar_url: string;
  country_code: string;
  city: string;
  date_of_birth: Date | null;
  gender: string;
  company_name: string;
  suspended_at: Date | null;
  made_official_at: Date | null;
  phone_verified_at: Date | null;
  email_verified_at: Date | null;
  profile_completed_at: Date | null;
  made_profile_public_at: Date | null;
  roles: RoleData[];
  invite: { code: string } | null;
  organizations: OrganizationDataType[];
  created_at: Date;
  updated_at: Date;
  deleted_at: number;
  uid: string;
  affiliate_codes: string;
  is_enterprise: boolean;
}
