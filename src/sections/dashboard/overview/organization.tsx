// next
import Link from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Button from '@mui/material/Button';
import Image from 'src/components/image/image';
import { useSettingsContext } from 'src/components/settings';
// routes
import { paths } from 'src/routes/paths';

// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

function Organization() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Stack sx={{ mb: 1 }}>
          <Image src="/assets/icons/home/ic_job.svg" />
        </Stack>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {t('organization.welcome')}
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ whiteSpace: 'break-spaces', color: 'text.disabled', mb: 4 }}
        >
          {t('organization.to_begin')}
        </Typography>
        <Button
          variant="contained"
          sx={{ width: 280, height: 48, bgcolor: (theme) => alpha(theme.palette.grey[800], 1) }}
          LinkComponent={Link}
          href={paths.organization.company_info}
        >
          {t('organization.add_organization_or_company')}
        </Button>
      </Stack>
    </Container>
  );
}
export default Organization;
