'use client';

// react
import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// form

// form
import ChooseCategoryInfo from '../choose-category-info';

function ChooseCategoryView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <ChooseCategoryInfo />
    </Container>
  );
}

export default ChooseCategoryView;
