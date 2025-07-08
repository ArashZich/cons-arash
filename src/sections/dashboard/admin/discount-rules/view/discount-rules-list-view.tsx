// src/sections/dashboard/admin/discount-rules/view/discount-rules-list-view.tsx

'use client';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// sections
import DiscountRulesTable from '../discount-rules-table';

// ----------------------------------------------------------------------

export default function DiscountRulesListView() {
  const { t } = useLocales();

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2, pt: 2 }} spacing={1}>
      <Typography variant="h4">{t('admin.discount_rules_management')}</Typography>
      <DiscountRulesTable />
    </Stack>
  );
}
