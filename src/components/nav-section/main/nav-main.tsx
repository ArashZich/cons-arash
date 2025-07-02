// react
import React from 'react';
// @mui
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
// components
import OrganizationDialog from 'src/components/organization-dialog/organization-dialog';
import Iconify from 'src/components/iconify/iconify';

// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';

//
import PackageDetailsItem from 'src/components/package-details-item/package-details-item';
import NavList from '../vertical/nav-list';
import { navVerticalConfig } from '../config';
import { NavConfigProps, NavListProps, navNoProjectData } from '../types';

type GroupProps = {
  items: NavListProps[];
  config: NavConfigProps;
};

function Group({ items, config }: GroupProps) {
  const renderContent = items.map((list) => (
    <NavList
      key={list.title + list.path}
      data={list}
      depth={1}
      hasChild={!!list.children}
      config={config}
    />
  ));

  return (
    <List disablePadding sx={{ px: 2 }}>
      <Collapse in>{renderContent}</Collapse>
    </List>
  );
}

// ----------------------------------------------------------------------------

function NavMain({ data, config, sx, ...other }: navNoProjectData) {
  const organization = useSelector(organizationSelector);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      {organization && (
        <Stack sx={{ mt: 2, ml: 2 }}>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ width: 248, mb: 2 }}>
            <Button onClick={handleClickOpen} sx={{ width: '100%' }}>
              <Stack spacing={1} direction="row" alignItems="center" width="80%">
                <Stack>
                  <Iconify
                    icon="solar:calendar-mark-bold-duotone"
                    width={40}
                    sx={{ color: '#1877F2' }}
                  />
                </Stack>
                <Stack alignItems="flex-start">
                  <Typography variant="subtitle1" color="text.primary">
                    {organization?.name}
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    {organization?.industry}
                  </Typography>
                </Stack>
              </Stack>
              <Iconify icon="icon-park-outline:down" width={24} color="text.secondary" />
            </Button>
            <OrganizationDialog open={open} onClose={handleClose} />
          </Stack>
          <PackageDetailsItem />
          <Divider sx={{ width: 248, mb: 2 }} />
        </Stack>
      )}

      <Stack sx={{ mt: organization ? 0 : 2 }}>
        <Stack sx={sx} {...other}>
          {data.map((group, index) => (
            <Group key={index} items={group.items} config={navVerticalConfig(config)} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default NavMain;
