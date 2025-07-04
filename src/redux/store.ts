'use client';

/* eslint-disable import/no-extraneous-dependencies */

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
// eslint-disable-next-line import/no-cycle
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
