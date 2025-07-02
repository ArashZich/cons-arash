'use client';

import React from 'react';
import Stack from '@mui/material/Stack';
import ResetPassword from '../reset-password';

function ResetPasswordView() {
  return (
    <Stack minWidth={400} justifyContent="center" sx={{ pr: 3 }}>
      <ResetPassword />
    </Stack>
  );
}

export default ResetPasswordView;
