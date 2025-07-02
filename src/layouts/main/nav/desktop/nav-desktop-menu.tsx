import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { useLocales } from 'src/locales';
import { NavProps, NavItemProps } from '../types';
import NavList from './nav-list';
import { NavItem } from './nav-item';

// ----------------------------------------------------------------------

export default function NavDesktopWithDropdown({ offsetTop, data, txtColor }: NavProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const { isRtl } = useLocales();
  const theme = useTheme();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, menuTitle: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menuTitle);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, menuTitle: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleOpenMenu(event as unknown as React.MouseEvent<HTMLElement>, menuTitle);
    }
  };

  return (
    <Stack component="nav" direction="row" spacing={5} sx={{ ml: 2.5, mr: 2.5, height: 1 }}>
      {data.map((item: NavItemProps) => (
        <Box key={item.title} sx={{ display: 'flex', alignItems: 'center' }}>
          {item.children ? (
            <>
              <div
                onClick={(event) => handleOpenMenu(event, item.title)}
                onKeyDown={(event) => handleKeyDown(event, item.title)}
                role="button"
                tabIndex={0}
              >
                <NavItem
                  item={item}
                  offsetTop={offsetTop}
                  active={false}
                  open={currentMenu === item.title}
                  externalLink={false}
                  txtColor={txtColor}
                />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={currentMenu === item.title}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: isRtl ? 'right' : 'left',
                }}
                sx={{ mt: 1 }}
                slotProps={{
                  paper: {
                    sx: {
                      backgroundColor: theme.palette.grey[800], // تنظیم بک‌گراند منو
                    },
                  },
                }}
              >
                {item.children.map((child: { subheader: string; items: NavItemProps[] }) => (
                  <div key={child.subheader}>
                    {child.items.map((subItem: NavItemProps) => (
                      <MenuItem
                        key={subItem.title}
                        onClick={handleCloseMenu}
                        sx={{
                          backgroundColor: theme.palette.grey[800], // تنظیم بک‌گراند
                          '&:hover': {
                            backgroundColor: 'action.hover', // تنظیم بک‌گراند هنگام hover
                          },
                        }}
                      >
                        <NavList item={subItem} offsetTop={offsetTop} txtColor={txtColor} />
                      </MenuItem>
                    ))}
                  </div>
                ))}
              </Menu>
            </>
          ) : (
            <NavList key={item.title} item={item} offsetTop={offsetTop} txtColor={txtColor} />
          )}
        </Box>
      ))}
    </Stack>
  );
}
