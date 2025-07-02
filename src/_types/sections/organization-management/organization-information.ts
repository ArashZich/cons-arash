export interface State {
  company_logo: File | string | null | any;
  name: string;
  email: string;
  phone_number: string;
  website: string;
  domain: string;
  company_size: number;
  industry: string;
  showroom_url: string;
}

export type Action =
  | { type: 'company_logo'; payload: File | null | any }
  | { type: 'name'; payload: string }
  | { type: 'email'; payload: string }
  | { type: 'phone_number'; payload: string }
  | { type: 'website'; payload: string }
  | { type: 'domain'; payload: string }
  | { type: 'company_size'; payload: number }
  | { type: 'industry'; payload: string }
  | { type: 'update'; payload: State }
  | { type: 'showroom_url'; payload: string };
