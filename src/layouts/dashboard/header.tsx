// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// locales
import { useLocales } from 'src/locales';
// routes
import { usePathname } from 'src/routes/hooks';
// components
import Icon from 'src/components/iconify';
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
// _types
import { NotificationData } from 'src/_types/reality/notification/notificationData';
// layout
import { HEADER, NAV } from '../config-layout';
import {
  // Searchbar,
  AccountPopover,
  SettingsButton,
  LanguagePopover,
  NotificationsPopover,
} from '../_common';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
  active?: boolean | null;
  handleClickNewProject?: VoidFunction;
  activeBtn?: boolean;
  disabledBtn?: boolean;
  notifications?: NotificationData[]; // تغییر داده شده به NotificationData[]
};

export default function Header({
  onOpenNav,
  active,
  handleClickNewProject,
  activeBtn = true,
  disabledBtn,
  notifications,
}: Props) {
  const theme = useTheme();
  const { t } = useLocales();

  const settings = useSettingsContext();

  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard/';
  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      <Stack flexDirection="row" alignItems="center">
        {lgUp && isDashboard && <Logo sx={{ mr: 2.5 }} />}
        {!lgUp && isDashboard && (
          <IconButton onClick={onOpenNav}>
            <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
          </IconButton>
        )}
        {!isDashboard && <Logo sx={{ mr: 2.5 }} />}

        {/* {lgUp && <Searchbar />} */}
      </Stack>

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {activeBtn && (
          <Button
            variant="contained"
            sx={{ bgcolor: theme.palette.common.black }}
            startIcon={<Icon icon="ph:plus-bold" />}
            onClick={handleClickNewProject}
            size="small"
            disabled={disabledBtn}
          >
            {t('project.new_project')}
          </Button>
        )}
        <LanguagePopover />

        <NotificationsPopover notifications={notifications} />

        <SettingsButton />

        <AccountPopover active={active} />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: '100%',
          height: HEADER.H_DESKTOP,
          // ...(offsetTop && {
          //   height: HEADER.H_DESKTOP_OFFSET,
          // }),
          // ...(isNavHorizontal && {
          //   width: 1,
          //   bgcolor: 'background.default',
          //   height: HEADER.H_DESKTOP_OFFSET,
          //   borderBottom: `dashed 1px ${theme.palette.divider}`,
          // }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
