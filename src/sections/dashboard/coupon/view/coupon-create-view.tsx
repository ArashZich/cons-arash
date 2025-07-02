'use client';

// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';

//
import CategoryNewEditForm from '../coupon-new-edit-form';

//----------------------------------------------------------------

export default function CouponCreateView() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2 }}>
      <CustomBreadcrumbs
        heading={t('coupon.coupon_new')}
        links={[
          { name: t('dashboard.root'), href: paths.dashboard.root },
          {
            name: t('coupon.coupon'),
            href: paths.dashboard.coupon.root,
          },
          { name: t('coupon.coupon_new') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <CategoryNewEditForm />
      </Container>
    </Stack>
  );
}
