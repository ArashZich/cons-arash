'use client';

// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

// routes
import { paths } from 'src/routes/paths';

// req_hooks
import { useCouponsQuery } from 'src/_req-hooks/reality/coupon/useCouponsQuery';
// locales
import { useLocales } from 'src/locales';

//
import CategoryNewEditForm from '../coupon-new-edit-form';

//----------------------------------------------------------------

type Props = {
  id: string;
};

export default function CouponEditView({ id }: Props) {
  const { t } = useLocales();
  const settings = useSettingsContext();

  const { data: currentCoupon } = useCouponsQuery({ id }, { enabled: !!id });

  const coupon = currentCoupon?.data.items[0];

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
          { name: coupon?.code },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <CategoryNewEditForm currentCoupon={coupon} />
      </Container>
    </Stack>
  );
}
