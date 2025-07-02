'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { store } from './store';

type Props = {
  children: React.ReactNode;
};

export function ReduxProviders({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
