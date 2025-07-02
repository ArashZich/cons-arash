'use client';

/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
import { TokenType } from 'src/_types/redux/token';
// @types
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
// ----------------------------------------------------------------------

type TokenState = {
  tokens: TokenType[];
};

const initialState: TokenState = {
  tokens: [],
};

const slice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokensAdded(state, action) {
      state.tokens = action.payload;
    },
  },
});

// Reduce r
export default slice.reducer;

// Actio n s
export const { tokensAdded } = slice.actions;

// ----------------------------------------------------------------------

export const tokensSelector = (state: RootState) => state.token.tokens;
