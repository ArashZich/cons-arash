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
import CategoryListDataGrid from '../category-list-data-grid';

//----------------------------------------------------------------

export default function CategoryListView() {
  const { t } = useLocales();

  const router = useRouter();

  return (
    <Stack maxWidth={1200} sx={{ height: '100%', px: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <CustomBreadcrumbs
          heading={t('category_management.list')}
          links={[
            { name: t('dashboard.root'), href: paths.dashboard.root },
            {
              name: t('category_management.category'),
              href: paths.dashboard.category_management.root,
            },
            { name: t('category_management.list') },
          ]}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: (theme) => theme.palette.common.black }}
          startIcon={<Icon icon="ph:plus-bold" />}
          onClick={() => router.push(paths.dashboard.category_management.new)}
        >
          {t('category_management.new_category')}
        </Button>
      </Stack>
      <CategoryListDataGrid />
    </Stack>
  );
}
