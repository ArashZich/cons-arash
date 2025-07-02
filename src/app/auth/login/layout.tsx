'use client';

// auth
import { GuestGuard } from 'src/auth/guard';
// components
import AuthClassicLayout from 'src/layouts/auth/classic';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { t } = useLocales();

  return (
    <GuestGuard>
      <AuthClassicLayout title={t('auth.welcome')}>{children}</AuthClassicLayout>
    </GuestGuard>
  );
}
