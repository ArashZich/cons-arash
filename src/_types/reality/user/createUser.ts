export type CreateUserRequestBodyType = {
  name: string;
  last_name: string;
  avatar_url: string;
  id_code: string;
  phone: string;
  email: string;
  country_code: string;
  city: string;
  date_of_birth: Date;
  gender: string;
  nickname: string;
  biography: string;
  username: string;
  password: string;
  title: string;
};

export type CreateUserResponseType = {
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
    made_official_at: null;
    phone_verified_at: null;
    email_verified_at: null;
    profile_completed_at: null;
    made_profile_public_at: null;
    roles: null;
    stars: null;
    invite: {
      ID: number;
      code: null;
      limit: number;
      user_id: 7;
      created_at: Date;
      updated_at: Date;
      deleted_at: number;
    };
    crafts: null;
    socials: null;
    invoices: null;
    documents: null;
    credit_cards: null;
    address_book: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: number;
  };
};
