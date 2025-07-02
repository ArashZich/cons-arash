// registrationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PhoneNumberChangedPayloadType,
  RegistrationState,
  SessionCodeChangedPayloadType,
  StatusChangedPayloadType,
} from 'src/_types/redux/registration';

const initialState: RegistrationState = {
  phoneNumber: null,
  sessionCode: null,
  status: 'register',
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    phoneNumberChanged: (state, action: PayloadAction<PhoneNumberChangedPayloadType>) => {
      state.phoneNumber = action.payload;
    },
    sessionCodeChanged: (state, action: PayloadAction<SessionCodeChangedPayloadType>) => {
      state.sessionCode = action.payload;
    },

    statusChanged: (state, action: PayloadAction<StatusChangedPayloadType>) => {
      state.status = action.payload;
    },
  },
});

export const phoneNumberSelector = (state: { registration: RegistrationState }) =>
  state.registration.phoneNumber;
export const sessionCodeSelector = (state: { registration: RegistrationState }) =>
  state.registration.sessionCode;

export const statusSelector = (state: { registration: RegistrationState }) =>
  state.registration.status;

export const { phoneNumberChanged, sessionCodeChanged, statusChanged } = registrationSlice.actions;

export default registrationSlice.reducer;
