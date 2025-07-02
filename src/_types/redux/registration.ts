import { RegisterRequestBodyType } from '../reality/auth/register';

export type RegistrationState = {
  phoneNumber: string | null;
  sessionCode: string | null;
  status: 'register' | 'reset_password';
};

export type PhoneNumberChangedPayloadType = RegisterRequestBodyType['phone'];
export type SessionCodeChangedPayloadType = RegisterRequestBodyType['session_code'];
export type StatusChangedPayloadType = RegistrationState['status'];
