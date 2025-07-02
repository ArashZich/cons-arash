'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';

// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// req-hooks
import { useGetUserQuery } from 'src/_req-hooks/reality/user/useGetUserQuery';
// locales
import { useLocales } from 'src/locales';
//
import UserDetailsForm from '../user-details-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserDetailsView({ id }: Props) {
  const settings = useSettingsContext();
  const { t } = useLocales();

  const { data, isSuccess } = useGetUserQuery({ id });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('user_information.details')}
        links={[
          {
            name: t('dashboard.root'),
            href: paths.dashboard.root,
          },
          {
            name: t('user_information.user'),
            href: paths.dashboard.user_information.root,
          },
          { name: isSuccess ? data?.data.uid : '' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {isSuccess && <UserDetailsForm currentUser={data?.data} />}
    </Container>
  );
}
