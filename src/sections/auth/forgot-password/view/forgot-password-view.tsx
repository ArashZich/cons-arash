'use client';

import React from 'react';
import Stack from '@mui/material/Stack';
import ForgotPasswordHead from '../forgot-password-head';
import ForgotPasswordForm from '../forgot-password-form';

function ForgotPasswordView() {
  return (
    <Stack minWidth={400} justifyContent="center" sx={{ pr: 3 }}>
      <ForgotPasswordHead />
      <ForgotPasswordForm />
    </Stack>
  );
}

export default ForgotPasswordView;
