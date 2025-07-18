'use client';

// react
import { useEffect } from 'react';
// lodash
import isEmpty from 'lodash/isEmpty';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';

// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import NavMain from 'src/components/nav-section/main/nav-main';
import NavOrganization from 'src/components/nav-section/organization/nav-organization';
// routes
import { usePathname } from 'src/routes/hooks';
// auth
import { useAuthContext } from 'src/auth/hooks';
// layouts
import { NAV } from '../config-layout';
import { NavUpgrade } from '../_common';
import { useNavData } from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { user } = useAuthContext();

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navProjectData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {!isEmpty(user?.organizations) ? (
        <NavMain
          data={navProjectData}
          config={{
            currentRole: user?.roles?.[0].title.toLocaleLowerCase(),
          }}
        />
      ) : (
        <NavOrganization />
      )}

      <NavUpgrade />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            marginTop: 10,
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          <Logo sx={{ mt: 3, ml: 3, mb: 1 }} />

          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
