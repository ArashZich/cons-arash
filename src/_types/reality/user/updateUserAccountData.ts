import { RoleData } from '../role/roleData';

export type UpdateUserAccountRequestBodyType = {
  name: String;
  last_name: String;
  avatar_url: String;
  id_code: String;
  phone: String;
  email: String;
  country_code: String;
  city: String;
  date_of_birth: Date;
  gender: String;
  nickname: String;
  biography: String;
  username: String;
};

export type UpdateUserAccountResponseType = {
  statusCode: number;
  data: {
    ID: number;
    biography: string;
    rate: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    grade: number;
    id_code: string;
    password: string;
    last_name: string;
    username: string;
    nickname: string;
    avatar_url: string;
    country_code: string;
    city: string;
    date_of_birth: Date;
    gender: string;
    suspended_at: null;
    made_official_at: Date;
    phone_verified_at: Date;
    email_verified_at: Date;
    profile_completed_at: Date;
    made_profile_public_at: null;
    roles: RoleData[];
    stars: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  };
};
