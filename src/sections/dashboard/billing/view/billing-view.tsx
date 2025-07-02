'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocales } from 'src/locales';
import BillingDataGrid from '../billing-data-grid';

function BillingView() {
  const { t } = useLocales();
  return (
    <Stack>
      <Typography variant="h4">{t('dashboard.billing')}</Typography>
      <BillingDataGrid />
    </Stack>
  );
}

export default BillingView;
