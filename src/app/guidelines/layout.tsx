// src/app/guideline/layout.tsx

'use client';

// components
import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <MainLayout light>{children}</MainLayout>;
}
