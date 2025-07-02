// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
// hooks
import { Typography } from '@mui/material';
// components
import Button from '@mui/material/Button';
import Image from 'src/components/image/image';
import { useSettingsContext } from 'src/components/settings';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

function Project() {
  const { t } = useLocales();
  const settings = useSettingsContext();
  const router = useRouter();

  const handleClick = () => {
    router.push(paths.project.choose_category);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Stack sx={{ mb: 1 }}>
          <Image src="/assets/icons/home/ic_file.svg" />
        </Stack>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {t('project.first_project')}
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ whiteSpace: 'break-spaces', color: 'text.disabled', mb: 4 }}
        >
          {t('project.description_first_project')}
        </Typography>
        <Button
          variant="contained"
          sx={{ width: 280, height: 48, bgcolor: (theme) => alpha(theme.palette.grey[800], 1) }}
          onClick={handleClick}
        >
          {t('project.add_project')}
        </Button>
      </Stack>
    </Container>
  );
}
export default Project;
