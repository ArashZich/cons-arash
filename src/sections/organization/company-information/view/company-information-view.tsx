'use client';

// react
import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// form
import InformationFrom from '../information-form';

function CompanyInformationView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'sm'} sx={{ height: '100%' }}>
      <InformationFrom />
    </Container>
  );
}

export default CompanyInformationView;
