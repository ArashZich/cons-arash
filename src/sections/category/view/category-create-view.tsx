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
// locales
import { useLocales } from 'src/locales';

//
import CategoryNewEditForm from '../category-new-edit-form';

//----------------------------------------------------------------

export default function CategoryCreateView() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  return (
    <Stack maxWidth={1200} sx={{ height: '100%', px: 2 }}>
      <CustomBreadcrumbs
        heading={t('category_management.create_category')}
        links={[
          { name: t('dashboard.root'), href: paths.dashboard.root },
          {
            name: t('category_management.category'),
            href: paths.dashboard.category_management.root,
          },
          { name: t('category_management.create_category') },
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
