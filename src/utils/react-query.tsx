'use client';

// react
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

export default function QueryProviders({ children }: Props) {
  const [queryClient] = React.useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
