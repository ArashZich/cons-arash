'use client';

// react
import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import DecoroSphereFrom from '../decoro-sphere-form';

function DecoroSphereView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <DecoroSphereFrom />
    </Container>
  );
}

export default DecoroSphereView;
