// react
import React from 'react';
// @mui
import { Link as MULink } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// -------------------------------------------------------------------------------

function RegisterHead() {
  const { t } = useLocales();

  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4" mb={2}>
        {t('auth.get_started')}
      </Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">{t('auth.already_have_account')} </Typography>

        <MULink href={paths.auth.login} component={RouterLink} variant="subtitle2">
          {t('auth.login')}
        </MULink>
      </Stack>
    </Stack>
  );
}

export default RegisterHead;
