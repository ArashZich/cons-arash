// react
import React from 'react';
// @mui
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
// iconify
import { Typography } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
// locales
import { useLocales } from 'src/locales';
// components
import Scrollbar from 'src/components/scrollbar';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { organizationChanged, organizationSelector } from 'src/redux/slices/organization';

// types
import { OrganizationDataType } from 'src/_types/reality/organization/organizationData';

// auth
import { useAuthContext } from 'src/auth/hooks';

export interface OrganizationDialogProps {
  open: boolean;

  onClose: () => void;
}

export default function OrganizationDialog(props: OrganizationDialogProps) {
  const { user } = useAuthContext();
  const { t } = useLocales();
  const router = useRouter();
  const { onClose, open } = props;
  const organization = useSelector(organizationSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: OrganizationDataType) => {
    dispatch(organizationChanged(value));
    router.push(paths.dashboard.root);

    onClose();
  };

  const handleAddOrganization = () => {
    router.push(paths.organization.company_info);
    onClose();
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <Stack direction="row" alignItems="center">
        <DialogTitle>{t('dashboard.switch_organization')}</DialogTitle>
        <Button
          onClick={handleClose}
          sx={{
            ml: 'auto',
            // FIXME: hover
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <Iconify icon="mdi:window-close" />
        </Button>
      </Stack>
      <List sx={{ pt: 0 }}>
        <Scrollbar sx={{ height: 250 }}>
          {user?.organizations?.map((item) => (
            <ListItem disableGutters key={item.ID}>
              <ListItemButton
                sx={{
                  mx: 3,
                  border: '2px solid',
                  borderRadius: '8px',
                  borderColor: organization
                    ? (theme) => alpha(theme.palette.grey[800], 0.9)
                    : (theme) => alpha(theme.palette.grey[800], 0.04),
                }}
                onClick={() => handleListItemClick(item)}
              >
                <ListItemAvatar>
                  <Iconify
                    icon="solar:calendar-mark-bold-duotone"
                    width={40}
                    sx={{ color: '#1877F2' }}
                  />
                </ListItemAvatar>
                <Stack>
                  <ListItemText primary={item.name} />
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="caption" color="text.disabled">
                        {item.industry}
                      </Typography>
                    }
                  />
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </Scrollbar>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleAddOrganization()} alignItems="center">
            <Stack direction="row" spacing={1}>
              <Iconify icon="ic:outline-plus" width={20} />
              <ListItemText primary={t('dashboard.add_organization')} />
            </Stack>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
