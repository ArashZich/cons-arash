// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// locales
import { useLocales } from 'src/locales';

// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

function NavOrganization() {
  const { t } = useLocales();
  const router = useRouter();

  const handleClick = () => {
    router.push(paths.organization.company_info);
  };

  return (
    <Stack alignItems="center" sx={{ mt: 2 }}>
      <Stack
        alignItems="center"
        sx={{ width: 248, border: '1px solid #DFE3E8', borderRadius: '16px', pb: 2, pt: 2 }}
      >
        <Stack alignItems="center" spacing={1} sx={{ pb: 2 }}>
          <Typography variant="subtitle1">{t('dashboard.lets_get_start')}</Typography>
          <Stack alignItems="center">
            <Typography
              variant="body2"
              color="#919EAB"
              align="center"
              sx={{ whiteSpace: 'break-spaces' }}
            >
              {t('dashboard.begin_by_adding')}
            </Typography>
          </Stack>
        </Stack>
        <Button variant="outlined" onClick={handleClick}>
          {t('dashboard.add_organization')}
        </Button>
      </Stack>
    </Stack>
  );
}

export default NavOrganization;
