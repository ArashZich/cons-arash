// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @iconify
import { Icon } from '@iconify/react';

// routes
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';

// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { logout, user } = useAuthContext();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useLocales();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <Stack
      marginTop="auto"
      sx={{
        px: 2,
        pt: 5,
        pb: 13,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user?.avatar_url} alt={user?.name} sx={{ width: 48, height: 48 }}>
            {user?.name?.charAt(0)}
          </Avatar>
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.phone}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Button variant="text" href="#" rel="noopener" sx={{ mt: 2 }} onClick={handleLogout}>
        <Stack direction="row" spacing={2} color="text.secondary" marginRight="auto">
          <Icon width={24} icon="mdi:logout-variant" color="#454F5B" />
          {t('dashboard.logout')}
        </Stack>
      </Button>
    </Stack>
  );
}
