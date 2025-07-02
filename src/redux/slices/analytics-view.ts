import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AnalyticsViewState,
  AnalyticsViewChangedPayloadType,
} from 'src/_types/redux/analytics-view';

const initialState: AnalyticsViewState = {
  search: '',
  active: false,
  currentTab: 'total',
  project: null,
};

const analyticsViewSlice = createSlice({
  name: 'analyticsView',
  initialState,
  reducers: {
    analyticsViewChanged: (state, action: PayloadAction<AnalyticsViewChangedPayloadType>) => {
      if (action.payload.search !== undefined) state.search = action.payload.search;
      if (action.payload.active !== undefined) state.active = action.payload.active;
      if (action.payload.currentTab !== undefined) state.currentTab = action.payload.currentTab;
      if (action.payload.project !== undefined) state.project = action.payload.project;
    },
    resetAnalyticsView: (state) => {
      state.search = initialState.search;
      state.active = initialState.active;
      state.currentTab = initialState.currentTab;
      state.project = initialState.project;
    },
  },
});

export const analyticsViewSelector = (state: { analyticsView: AnalyticsViewState }) =>
  state.analyticsView;

export const { analyticsViewChanged, resetAnalyticsView } = analyticsViewSlice.actions;

export default analyticsViewSlice.reducer;
