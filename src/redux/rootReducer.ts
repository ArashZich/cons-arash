'use client';

/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
// eslint-disable-next-line import/no-cycle
import { persistReducer } from 'redux-persist';
import tokenReducer from './slices/token';
import registrationReducer from './slices/registration';
import organizationReducer from './slices/organization';
import projectReducer from './slices/project';
import packageReducer from './slices/package';
import analyticsReducer from './slices/analytics';
import analyticsViewReducer from './slices/analytics-view';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem(_key: any) {
    return Promise.resolve(null);
  },
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: any) {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const organizationPersistConfig = {
  key: 'organization',
  storage,
  keyPrefix: 'org-',
  blacklist: ['organizationInfo', 'planPurchase'],
};

// const packagePersistConfig = {
//   key: 'package',
//   storage,
//   keyPrefix: 'pkg-',
// };

const persistedOrganizationReducer = persistReducer(organizationPersistConfig, organizationReducer);
// const persistedPackageReducer = persistReducer(packagePersistConfig, packageReducer);

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  token: tokenReducer,
  registration: registrationReducer,
  organization: persistedOrganizationReducer,
  project: projectReducer,
  package: packageReducer,
  analytics: analyticsReducer,
  analyticsView: analyticsViewReducer,
});

export { rootPersistConfig, rootReducer };
