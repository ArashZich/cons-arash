'use client';

// react
import React from 'react';

// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';

// form
import ShowroomUploader from '../showroom-uploader';

function CreateShowroomView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <ShowroomUploader />
    </Container>
  );
}

export default CreateShowroomView;
