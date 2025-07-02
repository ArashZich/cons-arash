'use client';

// react
import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// form

// form
import ActivitiesForm from '../activities-form';

function CompanyActivitiesView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'sm'} sx={{ height: '100%' }}>
      <ActivitiesForm />
    </Container>
  );
}

export default CompanyActivitiesView;
