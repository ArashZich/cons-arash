import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OrganizationState,
  OrganizationChangedPayloadType,
  OrganizationInfoChangedPayloadType,
} from 'src/_types/redux/organization';

const initialState: OrganizationState = {
  organization: null,
  organizationInfo: null,
  planPurchase: '',
};

const organizationCategorySlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    organizationChanged: (state, action: PayloadAction<OrganizationChangedPayloadType>) => {
      state.organization = action.payload;
    },
    organizationInfoChanged: (state, action: PayloadAction<OrganizationInfoChangedPayloadType>) => {
      state.organizationInfo = action.payload;
    },
    planPurchaseChanged: (state, action: PayloadAction<string>) => {
      state.planPurchase = action.payload;
    },
  },
});

export const organizationSelector = (state: { organization: OrganizationState }) =>
  state.organization.organization;
export const organizationInfoSelector = (state: { organization: OrganizationState }) =>
  state.organization.organizationInfo;
export const planPurchaseSelector = (state: { organization: OrganizationState }) =>
  state.organization.planPurchase;

export const { organizationChanged, organizationInfoChanged, planPurchaseChanged } =
  organizationCategorySlice.actions;

export default organizationCategorySlice.reducer;
