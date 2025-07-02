import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsState, AnalyticsChangedPayloadType } from 'src/_types/redux/analytics';

const initialState: AnalyticsState = {
  analytics: [],
};

const analyticsSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    analyticsChanged: (state, action: PayloadAction<AnalyticsChangedPayloadType>) => {
      state.analytics = action.payload;
    },
  },
});

export const analyticsSelector = (state: { analytics: AnalyticsState }) =>
  state.analytics.analytics;

export const { analyticsChanged } = analyticsSlice.actions;

export default analyticsSlice.reducer;
