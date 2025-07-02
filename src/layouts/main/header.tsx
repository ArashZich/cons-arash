// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgBlur } from 'src/theme/css';
// locales
import { useLocales } from 'src/locales';
// components
import Logo from 'src/components/logo';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { HEADER } from '../config-layout';
import { navConfigMenu, navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktopWithDropdown from './nav/desktop/nav-desktop-menu';
//
import { HeaderShadow, LanguagePopover } from '../_common';

// ----------------------------------------------------------------------

type Props = {
  light?: boolean;
};

export default function Header({ light = false }: Props) {
  const theme = useTheme();
  const { t } = useLocales();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: light ? theme.palette.common.white : theme.palette.common.black,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo isWhite={!light} />
          {mdUp && (
            <NavDesktopWithDropdown
              offsetTop={offsetTop}
              data={navConfigMenu(t)}
              txtColor={light ? theme.palette.common.black : theme.palette.common.white}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }} spacing={2}>
            <Button
              component={RouterLink}
              href={PATH_AFTER_LOGIN}
              variant="contained"
              color={light ? 'primary' : 'secondary'}
            >
              {t('landing.login')}
            </Button>

            {mdUp && <LanguagePopover />}

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig(t)} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
