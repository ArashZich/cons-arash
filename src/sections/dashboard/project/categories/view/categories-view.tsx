'use client';

// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';

//
import ChooseCategory from '../choose-category';
//----------------------------------------------------------------

export default function CategoriesView() {
  return (
    <Stack sx={{ height: '100%', px: 2 }}>
      <ChooseCategory />
    </Stack>
  );
}
