export type ChangePasswordRequestBodyType = {
  password: string;
  new_password: string;
};

export type ChangePasswordUserDataType = {
  user: {
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
    date_of_birth: string | null;
    gender: string;
    suspended_at: string | null;
    made_official_at: string;
    phone_verified_at: string;
    email_verified_at: string;
    profile_completed_at: string;
    made_profile_public_at: string | null;
    roles: string | null;
    stars: string | null;
    invite: string | null;
    crafts: string | null;
    socials: string | null;
    invoices: string | null;
    documents: string | null;
    credit_cards: string | null;
    address_book: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: number;
  };
  access_token: string;
  refresh_token: string;
};

export type ChangePasswordResponseType = {
  statusCode: number;
  data: ChangePasswordUserDataType;
};
