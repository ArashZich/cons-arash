export interface State {
  company_name: string;
  company_registration_number: string;
  national_code: string;
  legal_address: string;
  zip_code: string;
}

export type Action =
  | { type: 'company_name'; payload: string }
  | { type: 'company_registration_number'; payload: string }
  | { type: 'national_code'; payload: string }
  | { type: 'legal_address'; payload: string }
  | { type: 'zip_code'; payload: string }
  | { type: 'update'; payload: State };
