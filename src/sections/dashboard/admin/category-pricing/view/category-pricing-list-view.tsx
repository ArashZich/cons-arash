// src/sections/dashboard/admin/category-pricing/view/category-pricing-list-view.tsx

'use client';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// sections
import CategoryPricingTable from '../category-pricing-table';

// ----------------------------------------------------------------------

export default function CategoryPricingListView() {
  const { t } = useLocales();

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2, pt: 2 }} spacing={1}>
      <Typography variant="h4">{t('admin.category_pricing_management')}</Typography>
      <CategoryPricingTable />
    </Stack>
  );
}
