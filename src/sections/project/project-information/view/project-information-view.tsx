'use client';

// react
import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';

// form
import InformationForm from '../information-form';

function ProjectInformationView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <InformationForm />
    </Container>
  );
}

export default ProjectInformationView;
