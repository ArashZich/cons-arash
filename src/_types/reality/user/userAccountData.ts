export type UpdateAccountData = {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  id_code?: string;
  username: string;
  nickname?: string;
  last_name: string;
  biography?: string;
  avatar_url?: string;
  country_code: string;
  date_of_birth?: string;
  made_profile_public_at?: Date | boolean;
  afterSubmit?: string;
};
