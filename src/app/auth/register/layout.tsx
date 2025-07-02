'use client';

// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import AuthClassicLayout from 'src/layouts/auth/classic';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { t } = useLocales();

  return (
    <GuestGuard>
      <AuthClassicLayout title={t('auth.slogan_auth')}>
        {children}
      </AuthClassicLayout>
    </GuestGuard>
  );
}
