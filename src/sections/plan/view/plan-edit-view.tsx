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
import { usePlansQuery } from 'src/_req-hooks/reality/plan/usePlansQuery';
// locales
import { useLocales } from 'src/locales';

//
import CategoryNewEditForm from '../plan-new-edit-form';

//----------------------------------------------------------------

type Props = {
  id: string;
};

export default function PlanEditView({ id }: Props) {
  const { t } = useLocales();
  const settings = useSettingsContext();

  const { data: currentPlan } = usePlansQuery({ id }, { enabled: !!id });

  const plan = currentPlan?.data.items[0];

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2 }}>
      <CustomBreadcrumbs
        heading={t('plan_management.plan_management_edit')}
        links={[
          { name: t('dashboard.root'), href: paths.dashboard.root },
          {
            name: t('plan_management.plan'),
            href: paths.dashboard.plan_management.root,
          },
          { name: t(`plan_management.${plan?.title}`) },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <CategoryNewEditForm currentPlan={plan} />
      </Container>
    </Stack>
  );
}
