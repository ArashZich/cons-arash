// src/sections/dashboard/admin/plan-features/view/plan-features-list-view.tsx

'use client';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// sections
import PlanFeaturesTable from '../plan-features-table';

// ----------------------------------------------------------------------

export default function PlanFeaturesListView() {
  const { t } = useLocales();

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2, pt: 2 }} spacing={1}>
      <Typography variant="h4">{t('admin.plan_features_management')}</Typography>
      <PlanFeaturesTable />
    </Stack>
  );
}
