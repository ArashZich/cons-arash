'use client';

// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// icon
import { Icon } from '@iconify/react';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
//
import CouponListDataGrid from '../coupon-list-data-grid';

//----------------------------------------------------------------

export default function CouponListView() {
  const { t } = useLocales();

  const router = useRouter();

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <CustomBreadcrumbs
          heading={t('coupon.coupon')}
          links={[
            { name: t('dashboard.root'), href: paths.dashboard.root },
            {
              name: t('coupon.coupon'),
              href: paths.dashboard.coupon.root,
            },
            { name: t('coupon.coupon_list') },
          ]}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: (theme) => theme.palette.common.black }}
          startIcon={<Icon icon="ph:plus-bold" />}
          onClick={() => router.push(paths.dashboard.coupon.new)}
        >
          {t('coupon.coupon_new')}
        </Button>
      </Stack>
      <CouponListDataGrid />
    </Stack>
  );
}
