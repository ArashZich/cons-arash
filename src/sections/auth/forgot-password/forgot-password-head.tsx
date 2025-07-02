// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';

function ForgotPasswordHead() {
  const { t } = useLocales();

  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="h4" sx={{ alignItems: 'flex-start', color: 'text.primary' }}>
          {t('auth.forgot_password')}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {t('auth.enter_phone_number')}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ForgotPasswordHead;
