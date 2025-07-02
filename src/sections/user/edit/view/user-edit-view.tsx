'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';

// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// locales
import { useLocales } from 'src/locales';
// req-hooks
import { useGetUserQuery } from 'src/_req-hooks/reality/user/useGetUserQuery';

//
import UserEditForm from '../user-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { t } = useLocales();

  const { data, isSuccess } = useGetUserQuery({ id });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('user_management.edit')}
        links={[
          {
            name: t('dashboard.root'),
            href: paths.dashboard.root,
          },
          {
            name: t('user_information.user'),
            href: paths.dashboard.user_management.root,
          },
          { name: isSuccess ? data?.data.uid : '' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {isSuccess && <UserEditForm currentUser={data?.data} />}
    </Container>
  );
}
