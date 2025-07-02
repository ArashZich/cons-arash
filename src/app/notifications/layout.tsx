'use client';

// auth
import { AuthGuard } from 'src/auth/guard';
// components
import BusinessLayout from 'src/layouts/business';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <BusinessLayout>{children}</BusinessLayout>
    </AuthGuard>
  );
}
