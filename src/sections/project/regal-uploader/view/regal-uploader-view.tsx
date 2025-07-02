'use client';

// react
import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// form
import RegalUploaderForm from '../regal-uploader-form';

function RegalUploaderView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <RegalUploaderForm />
    </Container>
  );
}

export default RegalUploaderView;
