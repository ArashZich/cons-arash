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
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
// locales
import { useLocales } from 'src/locales';

//
import CategoryNewEditForm from '../category-new-edit-form';

//----------------------------------------------------------------

type Props = {
  id: string;
};

export default function CategoryEditView({ id }: Props) {
  const { t } = useLocales();
  const settings = useSettingsContext();

  const { data: currentCategory } = useCategoriesQuery({ id }, { enabled: !!id });

  const category = currentCategory?.data.items[0];

  return (
    <Stack maxWidth={1200} sx={{ height: '100%', px: 2 }}>
      <CustomBreadcrumbs
        heading={t('category_management.edit')}
        links={[
          { name: t('dashboard.root'), href: paths.dashboard.root },
          {
            name: t('category_management.category'),
            href: paths.dashboard.category_management.root,
          },
          { name: t(`category.${category?.title}`) },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <CategoryNewEditForm currentCategory={category} />
      </Container>
    </Stack>
  );
}
