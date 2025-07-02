import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

const OPTIONS = (t: Function) => [
  {
    label: t('dashboard.overview'),
    linkTo: paths.dashboard.root,
  },
  {
    label: t('dashboard.analytics'),
    linkTo: paths.dashboard.analytics.root,
  },
  {
    label: t('dashboard.projects'),
    linkTo: paths.dashboard.projects.category,
  },
];

// ----------------------------------------------------------------------
type AccountPopoverProps = {
  active?: boolean | null;
};

export default function AccountPopover({ active }: AccountPopoverProps) {
  const router = useRouter();
  const { t } = useLocales();

  const { logout, user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.push(paths.auth.login);
    } catch (error) {
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.avatar_url}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name?.charAt(0)}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name} {user?.last_name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.phone}
          </Typography>
        </Box>

        {active && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack sx={{ p: 1 }}>
              {OPTIONS(t).map((option) => (
                <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                  {option.label}
                </MenuItem>
              ))}
            </Stack>
          </>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          {t('dashboard.logout')}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
