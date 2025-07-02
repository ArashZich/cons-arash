import { UserData } from '../user/userData';

export type InvoiceItem = {
  ID: number;
  created_at: Date;
  deleted_at: number;
  description: string;
  discounted_price: number;
  invoice: null;
  invoice_id: number;
  organization_id: number;
  owner_id: number;
  owner_type: string;
  resolved_at: null;
  title: string;
  total_price: number;
  updated_at: Date;
  user: null;
  user_id: number;
};

export interface InvoiceData {
  ID: number;
  coupon_code: string;
  created_at: Date;
  custom_ref_id: string;
  deleted_at: number;
  due_date: null;
  final_paid_amount: number;
  from_address: string;
  from_email: string;
  from_name: string;
  from_phone_number: string;
  invoice_items: InvoiceItem[];
  invoice_unique_code: string;
  organization: null;
  organization_id: number;
  ref_id: string;
  status: string;
  suspended_at: null;
  tax_amount: number;
  to_address: string;
  to_email: string;
  to_name: string;
  to_phone_number: string;
  to_postal_code: string;
  updated_at: Date;
  user: UserData;
  user_id: number;
  economic_id: string;
  from_postal_code: string;
  register_number: string;
  seller: string;
}
